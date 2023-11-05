import fs from 'fs-extra';

let rimraf;

// Dynamically import rimraf
import('rimraf').then(module => {
    rimraf = module.default || module;
});

export default function() {
    return {
        name: 'custom-adapter',
        async adapt({ utils }) {

            // Check if rimraf is imported
            if (!rimraf) {
                console.error('Failed to import rimraf');
                return;
            }

            // Delete the existing static directory if it exists
            rimraf.sync('static');
            
            console.log('Current directory:', process.cwd());

            // Removed the utils.rimraf line as it's redundant with rimraf.sync

            await fs.copy('.svelte-kit/output/client', '../buffer-backend/src/main/resources/static'); // Copy the built files to Spring Boot static directory
            console.log('Custom adapter: Successfully copied built files to Spring Boot static directory.');
        }
    };
}
