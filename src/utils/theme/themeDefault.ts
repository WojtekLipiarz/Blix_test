import { darken, transparentize, lighten } from 'polished';

// MODELS
interface PolishedInterface {
	color?: string;
	amount?: number;
}
interface GradientInterface {
	color?: string;
	angle?: 180 | 125;
}
interface ShadowInterface {
	color?: string;
}

export const zIndexesArray = [
	'z_index_floor',
	'z_index_nav',
	'z_index_dropdown',
	'z_index_overlay',
	'z_index_modal',
] as const;

type ZIndexesType = {
	[key in (typeof zIndexesArray)[number]]: number;
};

const makeZIndexes = (layers: typeof zIndexesArray) =>
	layers.reduce((accu, layerName, index) => {
		accu[layerName] = index + 1;

		return accu;
	}, {} as ZIndexesType);

export const zIndexes = makeZIndexes(zIndexesArray);

export const colors = {
	primary: 'hsl(259, 86%, 53%)',
	secondary: 'hsl(18,74%,57%)',

	danger: 'hsl(0, 89%, 63%)',
	warning: 'hsl(44, 90%, 53%)',
	success: 'hsl(141, 55%, 48%)',
	info: 'hsl(230, 91%, 64%)',

	white: 'hsl(0, 0%, 100%)',
	grey100: 'hsl(210, 17%, 98%)',
	grey200: 'hsl(210, 16%, 93%)',
	grey300: 'hsl(210, 14%, 89%)',
	grey400: 'hsl(210, 14%, 83%)',
	grey500: 'hsl(210, 11%, 71%)',
	grey600: 'hsl(208, 7%, 46%)',
	grey700: 'hsl(210, 9%, 31%)',
	grey800: 'hsl(210, 10%, 23%)',
	grey900: 'hsl(210, 11%, 15%)',
	grey1000: 'hsl(200, 5%, 12%)',
	black: 'hsl(0, 0%, 0%)',
};

export const breakpoints = {
	xs: '0',
	sm: '576px',
	md: '768px',
	lg: '992px',
	xl: '1200px',
	xxl: '1400px',
};

export type ColorsKeys = keyof typeof colors;
export type BreakpointsKeys = keyof typeof breakpoints;

const theme = {
	...zIndexes,
	...colors,

	font: 'sans-serif',

	fontWeight: {
		regular: 400,
		medium: 500,
		semiBold: 600,
		bold: 700,
	},

	radius: {
		0: '0',
		1: '0.25rem',
		2: '0.5rem',
		3: '0.75rem',
		4: '1rem',
		5: '1.25rem',
	},

	breakpoints,

	// POLISHED
	transparentize: ({ amount = 0.7, color }: PolishedInterface) => transparentize(amount ?? 0.7, color ?? theme.primary),
	lighten: ({ amount = 0.7, color }: PolishedInterface) => lighten(amount ?? 0.7, color ?? theme.primary),
	darken: ({ amount = 0.7, color }: PolishedInterface) => darken(amount ?? 0.2, color ?? theme.primary),

	// GRADIENT
	gradient0x100: ({ color, angle }: GradientInterface) => {
		const angleParse = `${angle ?? 180}deg`;
		const colorStart = color ?? theme.primary;
		const colorEnd = theme.white;
		return `linear-gradient(${angleParse}, ${colorStart} 0%, ${colorEnd} 100%)`;
	},

	// SHADOW
	shadowSmall: ({ color }: ShadowInterface) => {
		const shadow = '0px 1px 2px';
		const colorValue = color ?? 'rgb(96, 109, 178)';
		const amountValue = 0.9;
		return `
			box-shadow:  ${shadow} ${theme.transparentize({ color: colorValue, amount: amountValue })};
			-webkit-box-shadow:  ${shadow} ${theme.transparentize({ color: colorValue, amount: amountValue })};
		`;
	},
	shadowRegular: ({ color }: ShadowInterface) => {
		const shadow = '0px 2px 8px';
		const colorValue = color ?? 'rgb(96, 109, 178)';
		const amountValue = 0.9;
		return `
			box-shadow:  ${shadow} ${theme.transparentize({ color: colorValue, amount: amountValue })};
			-webkit-box-shadow:  ${shadow} ${theme.transparentize({ color: colorValue, amount: amountValue })};
		`;
	},
	shadowMedium: ({ color }: ShadowInterface) => {
		const shadow = '0px 4px 16px';
		const colorValue = color ?? 'rgb(96, 109, 178)';
		const amountValue = 0.9;
		return `
			box-shadow:  ${shadow} ${theme.transparentize({ color: colorValue, amount: amountValue })};
			-webkit-box-shadow:  ${shadow} ${theme.transparentize({ color: colorValue, amount: amountValue })};
		`;
	},
	shadowLarge: ({ color }: ShadowInterface) => {
		const shadow = '0px 4px 40px';
		const colorValue = color ?? 'rgb(96, 109, 178)';
		const amountValue = 0.9;
		return `
			box-shadow: ${shadow} ${theme.transparentize({ color: colorValue, amount: amountValue })};
			-webkit-box-shadow:  ${shadow} ${theme.transparentize({ color: colorValue, amount: amountValue })};
		`;
	},
};

export type ThemeType = typeof theme;
export type RadiusType = keyof ThemeType['radius'];

export default theme;
