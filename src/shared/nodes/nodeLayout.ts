import { getProject } from "@shared/data/projects";
import type { RackLayout } from "./initialNodes";
import type { PortfolioNode } from "./node.types";

export const MODULE_SEAM = 2;
export const UNIT_1U = 96;
export const UNIT_1_5U = 145;
export const UNIT_3U = 292;
export const UNIT_4U = 390;
export const FX_WIDTH = 132;

const HP_STEP = 28;
const MIN_LEFT_ZONE = 448;
const MIN_DISPLAY_WIDTH = 320;
const MIN_BLANK_SIZE = 12;
const BLANK_MAX_ASPECT = 2;

interface Position {
	x: number;
	y: number;
}

export type PackedPositions = Map<string, Position>;
export type NaturalWidths = Map<string, number>;

export interface BlankPanelRect {
	id: string;
	x: number;
	y: number;
	width: number;
	height: number;
}

export interface FrameRect {
	x: number;
	y: number;
	width: number;
	height: number;
}

export interface PackResult {
	positions: PackedPositions;
	widths: Map<string, number>;
	blanks: BlankPanelRect[];
}

const FILTER_ID = "filter-3";
const FILTER_ITEM_IDS = ["filterItem-4", "filterItem-18", "filterItem-19", "filterItem-20", "filterItem-21"];
const LANGUAGE_ID = "language-5";
const LANGUAGE_ITEM_IDS = ["languageItem-6", "languageItem-12"];
const THEME_ID = "theme-9";
const THEME_ITEM_IDS = ["themeItem-10", "themeItem-11"];
const DISPLAY_ID = "display-1";
const FX_ID = "displayFilter-2";
const LINK_ID = "link-7";
const SWITCH_ID = "switch-8";

const TOP_RAIL_IDS = [
	FILTER_ID,
	...FILTER_ITEM_IDS,
	LANGUAGE_ID,
	...LANGUAGE_ITEM_IDS,
	THEME_ID,
	...THEME_ITEM_IDS,
];
const STRETCHABLE_IDS = [...FILTER_ITEM_IDS, ...LANGUAGE_ITEM_IDS];

export const naturalWidth = (node: PortfolioNode): number => {
	if (node.data.kind === "display") return 520;
	if (node.data.kind === "modifier") return FX_WIDTH;
	if (node.data.kind === "control") return node.id === SWITCH_ID ? 144 : 88;
	if (node.data.kind === "project") return 148;
	if (node.data.kind === "filter") return 96;
	if (node.data.kind === "language") return node.type === "language" ? 116 : 120;
	if (node.data.kind === "theme") return 120;
	return 120;
};

export const naturalHeight = (node: PortfolioNode): number => {
	if (node.data.kind === "display") return UNIT_4U;
	if (node.data.kind === "modifier") return UNIT_3U;
	if (node.data.kind === "control") return UNIT_1_5U;
	return UNIT_1U;
};

const pushBlankRect = (blanks: BlankPanelRect[], x: number, y: number, width: number, height: number, prefix: string): void => {
	if (width < MIN_BLANK_SIZE || height < MIN_BLANK_SIZE) return;

	const maxPanel = Math.min(width, height) * BLANK_MAX_ASPECT;
	if (width <= maxPanel && height <= maxPanel) {
		blanks.push({ id: `${prefix}-${Math.round(x)}-${Math.round(y)}`, x, y, width, height });
		return;
	}

	const splitHorizontally = width >= height;
	const length = splitHorizontally ? width : height;
	const count = Math.ceil(length / maxPanel);
	const usable = length - (count - 1) * MODULE_SEAM;
	if (usable < count * MIN_BLANK_SIZE) {
		blanks.push({ id: `${prefix}-${Math.round(x)}-${Math.round(y)}`, x, y, width, height });
		return;
	}

	const base = Math.floor(usable / count);
	const extra = usable - base * count;
	let cursor = splitHorizontally ? x : y;

	for (let index = 0; index < count; index += 1) {
		const size = base + (index < extra ? 1 : 0);
		pushBlankRect(
			blanks,
			splitHorizontally ? cursor : x,
			splitHorizontally ? y : cursor,
			splitHorizontally ? size : width,
			splitHorizontally ? height : size,
			`${prefix}-${index}`,
		);
		cursor += size + MODULE_SEAM;
	}
};

export const fillFrameBlanks = (
	nodes: PortfolioNode[],
	packed: PackResult["positions"],
	widths: Map<string, number>,
	frame: FrameRect,
): BlankPanelRect[] => {
	if (frame.width < MIN_BLANK_SIZE || frame.height < MIN_BLANK_SIZE) return [];

	const frameLeft = frame.x;
	const frameTop = frame.y;
	const frameRight = frame.x + frame.width;
	const frameBottom = frame.y + frame.height;
	const byId = new Map(nodes.map((node) => [node.id, node]));
	const rects = nodes.map((node) => {
		const position = packed.get(node.id)!;
		return {
			left: Math.max(frameLeft, position.x - MODULE_SEAM),
			right: Math.min(frameRight, position.x + widths.get(node.id)! + MODULE_SEAM),
			top: Math.max(frameTop, position.y - MODULE_SEAM),
			bottom: Math.min(frameBottom, position.y + naturalHeight(byId.get(node.id)!) + MODULE_SEAM),
		};
	}).filter((rect) => rect.right > frameLeft && rect.left < frameRight && rect.bottom > frameTop && rect.top < frameBottom);

	const rawCuts = [...new Set([frameTop, frameBottom, ...rects.flatMap((rect) => [rect.top, rect.bottom])])]
		.filter((value) => value >= frameTop && value <= frameBottom)
		.sort((a, b) => a - b);
	const cuts = [rawCuts[0]];
	for (const value of rawCuts.slice(1)) {
		if (value - cuts[cuts.length - 1] >= MIN_BLANK_SIZE) cuts.push(value);
	}
	cuts[cuts.length - 1] = frameBottom;
	const blanks: BlankPanelRect[] = [];

	for (let index = 0; index < cuts.length - 1; index += 1) {
		const top = cuts[index];
		const height = cuts[index + 1] - top;
		if (height < MIN_BLANK_SIZE) continue;

		const middle = top + height / 2;
		const blocked = rects.filter((rect) => rect.top <= middle && middle < rect.bottom).sort((a, b) => a.left - b.left);
		let cursor = frameLeft;

		for (const rect of blocked) {
			if (rect.left - cursor >= MIN_BLANK_SIZE) {
				pushBlankRect(blanks, cursor, top, rect.left - cursor, height, `blank-${index}`);
			}
			cursor = Math.max(cursor, rect.right);
		}
		if (frameRight - cursor >= MIN_BLANK_SIZE) {
			pushBlankRect(blanks, cursor, top, frameRight - cursor, height, `blank-${index}-end`);
		}
	}

	return blanks;
};

const fillBlanks = (nodes: PortfolioNode[], packed: PackResult["positions"], widths: Map<string, number>): BlankPanelRect[] => {
	const byId = new Map(nodes.map((node) => [node.id, node]));
	const rects = nodes.map((node) => {
		const position = packed.get(node.id)!;
		return {
			left: position.x - MODULE_SEAM,
			right: position.x + widths.get(node.id)! + MODULE_SEAM,
			top: position.y - MODULE_SEAM,
			bottom: position.y + naturalHeight(byId.get(node.id)!) + MODULE_SEAM,
		};
	});
	const frame: FrameRect = {
		x: Math.min(...rects.map((rect) => rect.left)),
		y: Math.min(...rects.map((rect) => rect.top)),
		width: Math.max(...rects.map((rect) => rect.right)) - Math.min(...rects.map((rect) => rect.left)),
		height: Math.max(...rects.map((rect) => rect.bottom)) - Math.min(...rects.map((rect) => rect.top)),
	};

	return fillFrameBlanks(nodes, packed, widths, frame);
};

const projectBucket = (node: PortfolioNode): number => {
	if (node.data.kind !== "project") return 148;

	const title = node.data.localizedLabel ?? getProject(node.data.projectId)?.title;
	const length = Math.max(title?.nl.length ?? 0, title?.en.length ?? 0);
	if (length <= 12) return 148;
	if (length <= 20) return 176;
	return 204;
};

interface DeckOptions {
	filterVertical: boolean;
	projectColumns: number;
	stackDisplay: boolean;
	controlsBelow: boolean;
}

const packDeck = (nodes: PortfolioNode[], naturalWidths: NaturalWidths, options: DeckOptions): PackResult => {
	const positions: PackedPositions = new Map();
	const widths: Map<string, number> = new Map();
	const byId = new Map(nodes.map((node) => [node.id, node]));
	const natural = (id: string): number => naturalWidths.get(id) ?? naturalWidth(byId.get(id)!);

	for (const node of nodes) widths.set(node.id, natural(node.id));

	const controlWidth = Math.max(natural(LINK_ID), natural(SWITCH_ID));
	widths.set(LINK_ID, controlWidth);
	widths.set(SWITCH_ID, controlWidth);
	widths.set(FX_ID, FX_WIDTH);

	const railIds = [FILTER_ID, ...FILTER_ITEM_IDS];
	let contentX = 0;
	let topY = 0;

	if (options.filterVertical) {
		let railY = 0;
		for (const id of railIds) {
			positions.set(id, { x: 0, y: railY });
			railY += naturalHeight(byId.get(id)!) + MODULE_SEAM;
		}
		contentX = Math.max(96, ...railIds.map(natural)) + MODULE_SEAM;
	} else {
		let railX = 0;
		for (const id of railIds) {
			positions.set(id, { x: railX, y: 0 });
			railX += widths.get(id)! + MODULE_SEAM;
		}
		topY = UNIT_1U + MODULE_SEAM;
	}

	const projectNodes = nodes.filter((node) => node.data.kind === "project");
	const projectCellWidth = Math.max(0, ...projectNodes.map((node) => widths.get(node.id)!));
	const columns = Math.max(1, Math.min(3, options.projectColumns));
	const projectRows = Math.ceil(projectNodes.length / columns);
	const projectY = topY + UNIT_1U + MODULE_SEAM;
	projectNodes.forEach((node, index) => {
		positions.set(node.id, {
			x: contentX + (index % columns) * (projectCellWidth + MODULE_SEAM),
			y: projectY + Math.floor(index / columns) * (UNIT_1U + MODULE_SEAM),
		});
	});
	const projectsBottom = projectY + projectRows * UNIT_1U + Math.max(0, projectRows - 1) * MODULE_SEAM;

	const displayWidth = natural(DISPLAY_ID);
	const projectAreaWidth = projectCellWidth * columns + (columns - 1) * MODULE_SEAM;
	const topIds = [LANGUAGE_ID, ...LANGUAGE_ITEM_IDS, THEME_ID];
	let topX = contentX;
	for (const id of topIds) {
		positions.set(id, { x: topX, y: topY });
		topX += widths.get(id)! + MODULE_SEAM;
	}
	const topRowWidth = topX - contentX - MODULE_SEAM;
	const centerWidth = Math.max(
		projectAreaWidth,
		topRowWidth,
		options.stackDisplay ? displayWidth : FX_WIDTH + MODULE_SEAM + displayWidth,
	);

	const rightIds = options.controlsBelow ? [...THEME_ITEM_IDS] : [...THEME_ITEM_IDS, LINK_ID, SWITCH_ID];
	const rightX = contentX + centerWidth + MODULE_SEAM;
	let rightY = topY;
	for (const id of rightIds) {
		positions.set(id, { x: rightX, y: rightY });
		rightY += naturalHeight(byId.get(id)!) + MODULE_SEAM;
	}

	const lowerY = projectsBottom + MODULE_SEAM;
	positions.set(FX_ID, { x: contentX, y: lowerY });
	const displayX = options.stackDisplay ? contentX : contentX + FX_WIDTH + MODULE_SEAM;
	const displayY = options.stackDisplay ? lowerY + UNIT_3U + MODULE_SEAM : lowerY;
	positions.set(DISPLAY_ID, { x: displayX, y: displayY });

	if (options.controlsBelow) {
		const controlsY = displayY + UNIT_4U + MODULE_SEAM;
		positions.set(LINK_ID, { x: displayX, y: controlsY });
		positions.set(SWITCH_ID, { x: displayX + controlWidth + MODULE_SEAM, y: controlsY });
	}

	return { positions, widths, blanks: fillBlanks(nodes, positions, widths) };
};

interface CompactOptions {
	targetWidth: number;
	stackDisplay: boolean;
	controlsRight: boolean;
}

const packCompact = (nodes: PortfolioNode[], naturalWidths: NaturalWidths, options: CompactOptions): PackResult => {
	const positions: PackedPositions = new Map();
	const widths: Map<string, number> = new Map();
	const byId = new Map(nodes.map((node) => [node.id, node]));
	const natural = (id: string): number => naturalWidths.get(id) ?? (byId.get(id) ? naturalWidth(byId.get(id)!) : 120);

	for (const node of nodes) widths.set(node.id, natural(node.id));

	const controlWidth = Math.max(natural(LINK_ID), natural(SWITCH_ID));
	const displayWidth = natural(DISPLAY_ID);
	const projectIds = nodes.filter((node) => node.data.kind === "project").map((node) => node.id);
	const oneUIds = [...TOP_RAIL_IDS, ...projectIds];

	let rowX = 0;
	let rowY = 0;
	for (const id of oneUIds) {
		const node = byId.get(id);
		if (!node) continue;

		const width = widths.get(id)!;
		if (rowX > 0 && rowX + MODULE_SEAM + width > options.targetWidth) {
			rowX = 0;
			rowY += UNIT_1U + MODULE_SEAM;
		}
		positions.set(id, { x: rowX, y: rowY });
		rowX += width + MODULE_SEAM;
	}

	const bottomY = rowY + UNIT_1U + MODULE_SEAM;
	const displayX = options.stackDisplay ? 0 : FX_WIDTH + MODULE_SEAM;
	const displayY = options.stackDisplay ? bottomY + UNIT_3U + MODULE_SEAM : bottomY;
	positions.set(FX_ID, { x: 0, y: bottomY });
	positions.set(DISPLAY_ID, { x: displayX, y: displayY });

	const bottomFrameWidth = displayX + displayWidth;
	if (options.controlsRight) {
		const controlX = bottomFrameWidth + MODULE_SEAM;
		positions.set(LINK_ID, { x: controlX, y: bottomY });
		positions.set(SWITCH_ID, { x: controlX, y: bottomY + UNIT_1_5U + MODULE_SEAM });
	} else {
		const controlsY = displayY + UNIT_4U + MODULE_SEAM;
		positions.set(LINK_ID, { x: 0, y: controlsY });
		positions.set(SWITCH_ID, { x: controlWidth + MODULE_SEAM, y: controlsY });
	}

	return { positions, widths, blanks: fillBlanks(nodes, positions, widths) };
};

const packWide = (nodes: PortfolioNode[], naturalWidths: NaturalWidths): PackResult => {
	const positions: PackedPositions = new Map();
	const widths: Map<string, number> = new Map();
	const byId = new Map(nodes.map((node) => [node.id, node]));
	const natural = (id: string): number => naturalWidths.get(id) ?? (byId.get(id) ? naturalWidth(byId.get(id)!) : 120);

	for (const node of nodes) widths.set(node.id, natural(node.id));

	let topRailWidth = TOP_RAIL_IDS.reduce((sum, id) => sum + widths.get(id)!, 0) + (TOP_RAIL_IDS.length - 1) * MODULE_SEAM;
	const controlWidth = Math.max(natural(LINK_ID), natural(SWITCH_ID));
	const naturalDisplayWidth = natural(DISPLAY_ID);
	widths.set(LINK_ID, controlWidth);
	widths.set(SWITCH_ID, controlWidth);
	widths.set(FX_ID, FX_WIDTH);

	const projectNodes = nodes.filter((item) => item.data.kind === "project");
	const projectBuckets = projectNodes.map(projectBucket);
	const desiredLeftZone = projectBuckets.reduce((max, _bucket, index) => {
		if (index % 3 !== 0) return max;
		const row = projectBuckets.slice(index, index + 3);
		const rowWidth = row.reduce((sum, value) => sum + value, 0) + Math.max(0, row.length - 1) * MODULE_SEAM;
		return Math.max(max, rowWidth);
	}, MIN_LEFT_ZONE);

	const requiredBody = FX_WIDTH + naturalDisplayWidth + controlWidth + 3 * MODULE_SEAM + desiredLeftZone;
	if (topRailWidth < requiredBody) {
		const difference = requiredBody - topRailWidth;
		const totalWeight = STRETCHABLE_IDS.reduce((sum, id) => sum + widths.get(id)!, 0);
		let distributed = 0;

		STRETCHABLE_IDS.forEach((id, index) => {
			const share = index === STRETCHABLE_IDS.length - 1 ? difference - distributed : Math.round((difference * widths.get(id)!) / totalWeight);
			widths.set(id, widths.get(id)! + share);
			distributed += share;
		});

		topRailWidth += difference;
	}

	let displayWidth = naturalDisplayWidth;
	let leftZoneWidth = topRailWidth - FX_WIDTH - displayWidth - controlWidth - 3 * MODULE_SEAM;
	if (leftZoneWidth < desiredLeftZone) {
		displayWidth = Math.max(MIN_DISPLAY_WIDTH, topRailWidth - FX_WIDTH - controlWidth - 3 * MODULE_SEAM - desiredLeftZone);
		leftZoneWidth = topRailWidth - FX_WIDTH - displayWidth - controlWidth - 3 * MODULE_SEAM;
	}
	widths.set(DISPLAY_ID, displayWidth);

	let railX = 0;
	for (const id of TOP_RAIL_IDS) {
		positions.set(id, { x: railX, y: 0 });
		railX += widths.get(id)! + MODULE_SEAM;
	}

	const centerY = UNIT_1U + MODULE_SEAM;
	const projectRows: PortfolioNode[][] = [];
	let currentRow: PortfolioNode[] = [];
	let rowWidth = 0;

	for (const node of nodes.filter((item) => item.data.kind === "project")) {
		const bucket = projectBucket(node);
		if (currentRow.length === 0) {
			currentRow.push(node);
			rowWidth = bucket;
		} else if (rowWidth + MODULE_SEAM + bucket <= leftZoneWidth) {
			currentRow.push(node);
			rowWidth += MODULE_SEAM + bucket;
		} else {
			projectRows.push(currentRow);
			currentRow = [node];
			rowWidth = bucket;
		}
	}
	if (currentRow.length) projectRows.push(currentRow);

	for (const [rowIndex, row] of projectRows.entries()) {
		const baseBuckets = row.map(projectBucket);
		const rowBuckets = [...baseBuckets];
		let remainder = leftZoneWidth - (rowBuckets.reduce((sum, value) => sum + value, 0) + (rowBuckets.length - 1) * MODULE_SEAM);

		while (remainder >= HP_STEP) {
			const index = rowBuckets.findIndex((value, position) => value - baseBuckets[position] < HP_STEP);
			if (index < 0) break;
			rowBuckets[index] += HP_STEP;
			remainder -= HP_STEP;
		}

		let projectX = 0;
		const rowY = centerY + rowIndex * (UNIT_1U + MODULE_SEAM);
		row.forEach((node, index) => {
			widths.set(node.id, rowBuckets[index]);
			positions.set(node.id, { x: projectX, y: rowY });
			projectX += rowBuckets[index] + MODULE_SEAM;
		});
	}

	const fxX = leftZoneWidth + MODULE_SEAM;
	const displayX = fxX + FX_WIDTH + MODULE_SEAM;
	const controlX = displayX + displayWidth + MODULE_SEAM;
	positions.set(FX_ID, { x: fxX, y: centerY });
	positions.set(DISPLAY_ID, { x: displayX, y: centerY });
	positions.set(LINK_ID, { x: controlX, y: centerY });
	positions.set(SWITCH_ID, { x: controlX, y: centerY + UNIT_1_5U + MODULE_SEAM });

	return { positions, widths, blanks: fillBlanks(nodes, positions, widths) };
};

const fitScale = (nodes: PortfolioNode[], packed: PackResult, viewportWidth: number, viewportHeight: number): number => {
	const right = Math.max(...nodes.map((node) => packed.positions.get(node.id)!.x + (packed.widths.get(node.id) ?? naturalWidth(node))));
	const bottom = Math.max(...nodes.map((node) => packed.positions.get(node.id)!.y + naturalHeight(node)));

	return Math.min(viewportWidth / Math.max(1, right), viewportHeight / Math.max(1, bottom));
};

interface Candidate {
	packed: PackResult;
	scale: number;
	fillerRatio: number;
	blankCount: number;
}

const candidateMetrics = (nodes: PortfolioNode[], packed: PackResult, viewportWidth: number, viewportHeight: number): Candidate => {
	const realArea = nodes.reduce((sum, node) => sum + (packed.widths.get(node.id) ?? naturalWidth(node)) * naturalHeight(node), 0);
	const blankArea = packed.blanks.reduce((sum, blank) => sum + blank.width * blank.height, 0);

	return {
		packed,
		scale: fitScale(nodes, packed, viewportWidth, viewportHeight),
		fillerRatio: blankArea / Math.max(1, realArea + blankArea),
		blankCount: packed.blanks.length,
	};
};

export const packNodes = (
	nodes: PortfolioNode[],
	layout: RackLayout,
	naturalWidths: NaturalWidths,
	viewportWidth: number,
	viewportHeight: number,
): PackResult => {
	const width = Math.max(1, viewportWidth);
	const height = Math.max(1, viewportHeight);
	const wantsWide = layout !== "tall";
	const wide = packWide(nodes, naturalWidths);
	const withPreference = (packed: PackResult, matchesLayout: boolean): Candidate => {
		const metrics = candidateMetrics(nodes, packed, width, height);
		return { ...metrics, scale: metrics.scale + (matchesLayout ? 0.005 : 0) };
	};

	const displayWidth = naturalWidths.get(DISPLAY_ID) ?? 520;
	const compactWidths = [...new Set([
		Math.round(width),
		Math.round(width * 0.92),
		FX_WIDTH + MODULE_SEAM + displayWidth,
		displayWidth,
		MIN_LEFT_ZONE,
	])].filter((targetWidth) => targetWidth >= MIN_LEFT_ZONE && targetWidth <= Math.max(width, 1600));

	const candidates: Candidate[] = [
		withPreference(wide, wantsWide),
		...[true, false].flatMap((filterVertical) =>
			[1, 2, 3].flatMap((projectColumns) =>
				[true, false].flatMap((stackDisplay) =>
					[true, false].map((controlsBelow) =>
						withPreference(
							packDeck(nodes, naturalWidths, { filterVertical, projectColumns, stackDisplay, controlsBelow }),
							!wantsWide,
						),
					),
				),
			),
		),
		...compactWidths.flatMap((targetWidth) =>
			[true, false].flatMap((stackDisplay) =>
				[true, false].map((controlsRight) =>
					withPreference(packCompact(nodes, naturalWidths, { targetWidth, stackDisplay, controlsRight }), false),
				),
			),
		),
	];

	const eligible = candidates.filter((candidate) => candidate.fillerRatio <= 0.35);
	const pool = eligible.length > 0 ? eligible : candidates;

	return pool.reduce((best, candidate) => {
		if (Math.abs(candidate.scale - best.scale) > 0.02) return candidate.scale > best.scale ? candidate : best;
		if (Math.abs(candidate.fillerRatio - best.fillerRatio) > 0.005) return candidate.fillerRatio < best.fillerRatio ? candidate : best;
		return candidate.blankCount <= best.blankCount ? candidate : best;
	}).packed;
};
