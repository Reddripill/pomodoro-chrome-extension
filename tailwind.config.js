/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.html", "./src/**/*.{js,jsx,ts,tsx}"],
	darkMode: "media",
	theme: {
	  extend: {
		 colors: {
			selectedRed: "#E93C3C",
			mainRed: "#F85959",
			mainBg: '#FFF8EE',
			iconColor: '#000',
			timerColor: '#CAB98E',
			inputColor: '#FBE0BA',
			darkBg: 'rgba(202, 190, 174, 0.74)'
		 },
	  },
	},
	variants: {
	  extend: {},
	},
	plugins: [],
};
	
	// 	"selectedRed": "#E93C3C",
	// 	"mainRed": "#F85959",
	// 	'mainBg': '#FFF8EE',
	// 	'iconColor': '#000',
	// 	'timerColor': '#CAB98E',
	// 	'inputColor': '#FBE0BA',
	// 	'darkBg': 'rgba(202, 190, 174, 0.74)'
	// }