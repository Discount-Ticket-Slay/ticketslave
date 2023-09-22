import { spawn } from 'child_process';
import { createInterface } from 'readline';
import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import css from 'rollup-plugin-css-only';

const production = !process.env.ROLLUP_WATCH;

function serve() {
	let server;

	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			server = spawn('npm', ['run', 'start', '--', '--dev'], {
				stdio: ['ignore', 'inherit', 'inherit'],
				shell: true
			});

			process.on('SIGTERM', toExit);
			process.on('exit', toExit);
		}
	};
}

// additional configuration to prompt for the service name
async function getServiceName() {
    return new Promise((resolve) => {
        const rl = createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question('Enter the name of the service: ', (serviceName) => {
            rl.close();
            resolve(serviceName);
        });
    });
}

// Make the entire configuration a promise
export default (async () => {
    const serviceName = await getServiceName();
    
    return {
        input: 'src/main.js',
        output: {
            sourcemap: true,
            format: 'iife',
            name: 'app',
            file: `../${serviceName}/src/main/resources/static/public/build/bundle.js`
        },
        plugins: [
            svelte({
                compilerOptions: {
                    dev: !production
                }
            }),
            css({ output: 'bundle.css' }),
            resolve({
                browser: true,
                dedupe: ['svelte'],
                exportConditions: ['svelte']
            }),
            commonjs(),
            !production && serve(),
            !production && livereload('public'),
            production && terser()
        ],
        watch: {
            clearScreen: false
        }
    };
})();
