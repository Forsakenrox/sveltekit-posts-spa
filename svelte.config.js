import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			fallback: 'index.html',
			// strict: false,
		}),
		// prerender: { entries: [] }
		trailingSlash: 'always',
	},
};

export default config;
