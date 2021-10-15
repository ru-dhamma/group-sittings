/** @type {import('@sveltejs/kit').Config} */
import adapter from '@sveltejs/adapter-static';

const config = {
	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		paths: {
			base: process.env['DEPLOY'] ? '/group-sittings' : ''
		}, 
		adapter: adapter()
	}
};

export default config;
