const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				gray: { ...colors.zinc },
				primary: { ...colors.emerald }
			}
		}
	},
	plugins: []
};
