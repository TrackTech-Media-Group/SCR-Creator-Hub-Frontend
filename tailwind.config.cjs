/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,ts,jsx,tsx}"],
	content: [],
	theme: {
		extend: {
			fontSize: {
				note: ["11.5px", { fontWeight: 600 }],
				comment: ["14.4px", { fontWeight: 600 }],
				small: ["16.67px", { fontWeight: 600 }],
				base: ["20px", { fontWeight: 400 }],
				lg: ["24px", { fontWeight: 600 }],
				xl: ["28.8px", { fontWeight: 600 }],
				"2xl": ["35.16px", { fontWeight: 600 }],
				"3xl": ["41.47px", { fontWeight: 600 }],
				subtitle: ["49.77px", { fontWeight: 600, lineHeight: "50px" }],
				title: ["59.72px", { fontWeight: 800, lineHeight: "60px" }]
			},
			backgroundImage: {
				home_header: "url('/backgrounds/home_header_image.png')",
				home_conclusion: "url('/backgrounds/home_conclusion_image.png')",
				media_search_banner: "url('/backgrounds/media_search_banner.png')",
				user_blob: "url('/backgrounds/user_blob.svg')"
			},
			backgroundSize: {
				home_header: "850px",
				home_header_lg: "650px",
				home_header_md: "100%",
				media_search_banner: "1440px",
				user_blob: "75%"
			},
			keyframes: {
				skeleton: {
					"0%, 100%": { backgroundColor: "rgba(255, 255, 255, .1)" },
					"50%": { backgroundColor: "rgba(255, 255, 255, .2)" }
				}
			},
			animation: {
				skeleton: "skeleton 3s ease-in-out infinite"
			},
			colors: {
				// main
				"main-100": "rgba(6,8,35,0.1)",
				"main-200": "rgba(6,8,35,0.2)",
				"main-300": "rgba(6,8,35,0.3)",
				"main-400": "rgba(6,8,35,0.4)",
				"main-500": "rgba(6,8,35,0.5)",
				"main-600": "rgba(6,8,35,0.6)",
				"main-700": "rgba(6,8,35,0.7)",
				"main-800": "rgba(6,8,35,0.8)",
				"main-900": "rgba(6,8,35,0.9)",
				main: "rgba(6,8,35,1)",

				// white
				white: "rgba(255, 255, 255, 1)",
				"white-900": "rgba(255, 255, 255, .9)",
				"white-800": "rgba(255, 255, 255, .8)",
				"white-700": "rgba(255, 255, 255, .7)",
				"white-600": "rgba(255, 255, 255, .6)",
				"white-500": "rgba(255, 255, 255, .5)",
				"white-400": "rgba(255, 255, 255, .4)",
				"white-300": "rgba(255, 255, 255, .3)",
				"white-200": "rgba(255, 255, 255, .2)",
				"white-100": "rgba(255, 255, 255, .1)",

				// black
				black: "rgba(0, 0, 0, 1)",
				"black-900": "rgba(0, 0, 0, .9)",
				"black-800": "rgba(0, 0, 0, .8)",
				"black-700": "rgba(0, 0, 0, .7)",
				"black-600": "rgba(0, 0, 0, .6)",
				"black-500": "rgba(0, 0, 0, .5)",
				"black-400": "rgba(0, 0, 0, .4)",
				"black-300": "rgba(0, 0, 0, .3)",
				"black-200": "rgba(0, 0, 0, .2)",
				"black-100": "rgba(0, 0, 0, .1)",

				// bg
				"bg-dark": "#060823",

				// primary
				"primary-100": "rgba(75,95,115,0.1)",
				"primary-200": "rgba(75,95,115,0.2)",
				"primary-300": "rgba(75,95,115,0.3)",
				"primary-400": "rgba(75,95,115,0.4)",
				"primary-500": "rgba(75,95,115,0.5)",
				"primary-600": "rgba(75,95,115,0.6)",
				"primary-700": "rgba(75,95,115,0.7)",
				"primary-800": "rgba(75,95,115,0.8)",
				"primary-900": "rgba(75,95,115,0.9)",
				primary: "rgba(75,95,115,1)",

				// secondary
				"secondary-100": "rgba(29,31,61,0.1)",
				"secondary-200": "rgba(29,31,61,0.2)",
				"secondary-300": "rgba(29,31,61,0.3)",
				"secondary-400": "rgba(29,31,61,0.4)",
				"secondary-500": "rgba(29,31,61,0.5)",
				"secondary-600": "rgba(29,31,61,0.6)",
				"secondary-700": "rgba(29,31,61,0.7)",
				"secondary-800": "rgba(29,31,61,0.8)",
				"secondary-900": "rgba(29,31,61,0.9)",
				secondary: "rgba(29,31,61,1)",

				// tertiary
				"tertiary-100": "rgba(53,57,112,0.1)",
				"tertiary-200": "rgba(53,57,112,0.2)",
				"tertiary-300": "rgba(53,57,112,0.3)",
				"tertiary-400": "rgba(53,57,112,0.4)",
				"tertiary-500": "rgba(53,57,112,0.5)",
				"tertiary-600": "rgba(53,57,112,0.6)",
				"tertiary-700": "rgba(53,57,112,0.7)",
				"tertiary-800": "rgba(53,57,112,0.8)",
				"tertiary-900": "rgba(53,57,112,0.9)",
				tertiary: "rgba(53,57,112,1)",

				// highlight
				"highlight-100": "rgba(142,41,251,0.1)",
				"highlight-200": "rgba(142,41,251,0.2)",
				"highlight-300": "rgba(142,41,251,0.3)",
				"highlight-400": "rgba(142,41,251,0.4)",
				"highlight-500": "rgba(142,41,251,0.5)",
				"highlight-600": "rgba(142,41,251,0.6)",
				"highlight-700": "rgba(142,41,251,0.7)",
				"highlight-800": "rgba(142,41,251,0.8)",
				"highlight-900": "rgba(142,41,251,0.9)",
				highlight: "rgba(142,41,251,1)",

				// blue
				"blue-100": "rgba(0,112,243,0.1)",
				"blue-200": "rgba(0,112,243,0.2)",
				"blue-300": "rgba(0,112,243,0.3)",
				"blue-400": "rgba(0,112,243,0.4)",
				"blue-500": "rgba(0,112,243,0.5)",
				"blue-600": "rgba(0,112,243,0.6)",
				"blue-700": "rgba(0,112,243,0.7)",
				"blue-800": "rgba(0,112,243,0.8)",
				"blue-900": "rgba(0,112,243,0.9)",
				blue: "rgba(0,112,243,1)",

				// green
				"green-100": "rgba(12,205,107,0.1)",
				"green-200": "rgba(12,205,107,0.2)",
				"green-300": "rgba(12,205,107,0.3)",
				"green-400": "rgba(12,205,107,0.4)",
				"green-500": "rgba(12,205,107,0.5)",
				"green-600": "rgba(12,205,107,0.6)",
				"green-700": "rgba(12,205,107,0.7)",
				"green-800": "rgba(12,205,107,0.8)",
				"green-900": "rgba(12,205,107,0.9)",
				green: "rgba(12,205,107,1)",

				// grey
				"grey-100": "rgba(58,58,61,0.1)",
				"grey-200": "rgba(58,58,61,0.2)",
				"grey-300": "rgba(58,58,61,0.3)",
				"grey-400": "rgba(58,58,61,0.4)",
				"grey-500": "rgba(58,58,61,0.5)",
				"grey-600": "rgba(58,58,61,0.6)",
				"grey-700": "rgba(58,58,61,0.7)",
				"grey-800": "rgba(58,58,61,0.8)",
				"grey-900": "rgba(58,58,61,0.9)",
				grey: "rgba(58,58,61,1)"
			}
		}
	},
	plugins: []
};
