module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		container: {
			center: true,
		},
		fontFamily: {
			roboto: ['Montserrat', 'sans-serif'],
			montserrat: ['Roboto', 'sans-serif'],
		},
		screens: {
			mobile: '640px',

			tablet: '768px',

			laptop: '1024px',

			smallLaptop: '1440px',

			desktop: '1280px',

			television: '1536px',
		},
		extend: {
			width: {
				600: '600px',
				500: '500px',
			},
		},
	},
	plugins: [],
};
