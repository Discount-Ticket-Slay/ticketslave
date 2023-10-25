import adapter from '@sveltejs/adapter-static'; // Importing the static adapter
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// Specify the adapter and output directory
		adapter: adapter({
			pages: '../feed-backend/src/main/resources/static', // Output directory for pages
			assets: '../feed-backend/src/main/resources/static', // Output directory for assets
			strict: true
		}),
		// other options
	}
};

export default config;
