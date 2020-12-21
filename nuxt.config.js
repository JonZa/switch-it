import axios from 'axios';

let dynamicRoutes = () => {
	const routes = axios.get('https://jsonkeeper.com/b/WKYH').then(res => {
		return res.data.map(
			post =>
				`/news/${post.ArticleTitle.replace(/[^a-zA-Z]+/g, '')
					.split(' ')
					.join('-')}`
		);
	});
	return routes;
};

export default {
	target: 'static',
	/*
	 ** Headers of the page
	 */
	head: {
		title: process.env.npm_package_name || '',
		htmlAttrs: {
			lang: 'en'
		},
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{
				hid: 'description',
				name: 'description',
				content: process.env.npm_package_description || ''
			}
		],
		link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
	},
	/*
	 ** Customize the progress-bar color
	 */
	loading: { color: '#fff' },
	/*
	 ** Global CSS
	 */
	css: ['~/assets/variables.scss', '~/assets/include-media.scss'],
	/*
	 ** Plugins to load before mounting the App
	 */
	plugins: ['~/plugins/posts.server.js'],
	generate: {
		routes: dynamicRoutes
	},
	/*
	 ** Nuxt.js dev-modules
	 */
	buildModules: [],
	/*
	 ** Build configuration
	 */
	build: {
		/*
		 ** You can extend webpack config here
		 */
		extend(config, ctx) {}
	}
};
