module.exports = {
	/*
	** Headers of the page
	*/
	head: {
		title: 'yandex-tracker',
		meta: [
			{charset: 'utf-8'},
			{name: 'viewport', content: 'width=device-width, initial-scale=1'},
			{hid: 'description', name: 'description', content: 'test project'}
		],
		script: [
			{ src:'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js' }

		],
		link: [
			{rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
		]
	},
	/*
	** Customize the progress bar color
	*/
	loading: {color: '#3B8070'},
	plugins: [
		{src: '@/plugins/components'},
		{src: '@/plugins/ymap'}
	],
	/*
	** Build configuration
	*/
	build: {
		vendor: ['babel-polyfill'],
		babel: {
			plugins: ['@babel/plugin-proposal-export-default-from']
		},
		extractCSS: true
	},
	sources: {
		styles: {
			lang: 'scss',
			external: true
		},
		scripts: {
			lang: 'js',
			external: true
		},
		asAsync: 'promise'
	}
}

