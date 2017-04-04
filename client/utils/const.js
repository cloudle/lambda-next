import tinyColor from 'tinycolor2';

const main = '#3b5998'; //Facebook blue
const darkBackground = '#1c2b36';
export const colors = {
	darken, lighten,
	main: main,
	darkBackground,
	darkerBackground: darken(darkBackground, 5),
	lighterBackground: lighten(darkBackground, 5),
};

function darken (base = '#ffffff', amount = 5) {
	return tinyColor(base).darken(amount).toHexString();
}

function lighten (base = '#ffffff', amount = 5) {
	return tinyColor(base).lighten(amount).toHexString();
}

export const sizes = {
	navigationWidth: 50,
};