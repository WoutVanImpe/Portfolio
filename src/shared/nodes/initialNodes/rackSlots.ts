import type { RackLayout } from "../node.types";

export interface GridSlot {
	col: number;
	row: number;
}

export const GRID_UNIT = 20;

export const rackSlots: Record<RackLayout, Record<string, GridSlot>> = {
	wide: {
		"filter-3": { col: 0, row: 6 },
		"filterItem-4": { col: 0, row: 11 },
		"filterItem-18": { col: 0, row: 16 },
		"filterItem-19": { col: 0, row: 21 },
		"filterItem-20": { col: 0, row: 26 },
		"filterItem-21": { col: 0, row: 31 },
		bluebeard: { col: 7, row: 6 },
		"once-upon-a-time": { col: 17, row: 6 },
		"trifold-flyer": { col: 7, row: 11 },
		"social-media": { col: 17, row: 11 },
		"drone-video": { col: 7, row: 16 },
		"het-kikkertje": { col: 17, row: 16 },
		sproutspot: { col: 7, row: 21 },
		"jnm-forum": { col: 17, row: 21 },
		"wdm-project": { col: 7, row: 26 },
		"display-1": { col: 28, row: 6 },
		"link-7": { col: 55, row: 6 },
		"switch-8": { col: 62, row: 6 },
		"displayFilter-2": { col: 55, row: 14 },
		"language-5": { col: 28, row: 0 },
		"languageItem-6": { col: 34, row: 0 },
		"languageItem-12": { col: 40, row: 0 },
		"theme-9": { col: 46, row: 0 },
		"themeItem-10": { col: 52, row: 0 },
		"themeItem-11": { col: 58, row: 0 },
	},
	standard: {
		"filter-3": { col: 0, row: 6 },
		"filterItem-4": { col: 0, row: 11 },
		"filterItem-18": { col: 0, row: 16 },
		"filterItem-19": { col: 0, row: 21 },
		"filterItem-20": { col: 0, row: 26 },
		"filterItem-21": { col: 0, row: 31 },
		bluebeard: { col: 7, row: 6 },
		"once-upon-a-time": { col: 17, row: 6 },
		"trifold-flyer": { col: 7, row: 11 },
		"social-media": { col: 17, row: 11 },
		"drone-video": { col: 7, row: 16 },
		"het-kikkertje": { col: 17, row: 16 },
		sproutspot: { col: 7, row: 21 },
		"jnm-forum": { col: 17, row: 21 },
		"wdm-project": { col: 7, row: 26 },
		"display-1": { col: 28, row: 6 },
		"link-7": { col: 55, row: 6 },
		"switch-8": { col: 55, row: 13 },
		"displayFilter-2": { col: 55, row: 20 },
		"language-5": { col: 21, row: 0 },
		"languageItem-6": { col: 27, row: 0 },
		"languageItem-12": { col: 33, row: 0 },
		"theme-9": { col: 39, row: 0 },
		"themeItem-10": { col: 45, row: 0 },
		"themeItem-11": { col: 51, row: 0 },
	},
	tall: {
		"filter-3": { col: 0, row: 9 },
		"filterItem-4": { col: 0, row: 14 },
		"filterItem-18": { col: 0, row: 19 },
		"filterItem-19": { col: 0, row: 24 },
		"filterItem-20": { col: 0, row: 29 },
		"filterItem-21": { col: 0, row: 34 },
		bluebeard: { col: 6, row: 9 },
		"once-upon-a-time": { col: 18, row: 9 },
		"trifold-flyer": { col: 6, row: 14 },
		"social-media": { col: 18, row: 14 },
		"drone-video": { col: 6, row: 19 },
		"het-kikkertje": { col: 18, row: 19 },
		sproutspot: { col: 6, row: 24 },
		"jnm-forum": { col: 18, row: 24 },
		"wdm-project": { col: 6, row: 29 },
		"display-1": { col: 25, row: 9 },
		"link-7": { col: 25, row: 45 },
		"switch-8": { col: 32, row: 45 },
		"displayFilter-2": { col: 25, row: 52 },
		"language-5": { col: 25, row: 0 },
		"languageItem-6": { col: 31, row: 0 },
		"languageItem-12": { col: 37, row: 0 },
		"theme-9": { col: 25, row: 4 },
		"themeItem-10": { col: 31, row: 4 },
		"themeItem-11": { col: 37, row: 4 },
	},
};

export const slotToPosition = ({ col, row }: GridSlot) => ({
	x: col * GRID_UNIT,
	y: row * GRID_UNIT,
});

export const getRackLayout = (width: number, height: number): RackLayout => {
	if (height === 0) return "wide";

	const ratio = width / height;
	if (ratio >= 1.9) return "wide";
	if (ratio >= 1.45) return "standard";
	return "tall";
};
