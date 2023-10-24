import { vitePreprocess } from '@sveltejs/kit/vite';
import customAdapter from './custom-adapter/index.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: customAdapter(), // use the custom adapter
		// ... other options you may have
	}
};

export default config;
