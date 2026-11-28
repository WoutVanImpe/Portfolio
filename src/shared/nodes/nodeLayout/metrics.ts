import type { PortfolioNode, RackLayout } from "../node.types";
import { DISPLAY_ID, FX_WIDTH, MIN_LEFT_ZONE, MODULE_SEAM } from "./constants";
import { naturalHeight, naturalWidth } from "./dimensions";
import { packCompact, packDeck, packWide } from "./pack";
import type { Candidate, NaturalWidths, PackResult } from "./types";

const fitScale = (nodes: PortfolioNode[], packed: PackResult, viewportWidth: number, viewportHeight: number): number => {
	const positions = nodes.map((node) => {
		const position = packed.positions.get(node.id)!;
		return {
			left: position.x,
			top: position.y,
			right: position.x + (packed.widths.get(node.id) ?? naturalWidth(node)),
			bottom: position.y + naturalHeight(node),
		};
	});
	const left = Math.min(...positions.map((rect) => rect.left));
	const top = Math.min(...positions.map((rect) => rect.top));
	const right = Math.max(...positions.map((rect) => rect.right));
	const bottom = Math.max(...positions.map((rect) => rect.bottom));

	return Math.min(viewportWidth / Math.max(1, right - left), viewportHeight / Math.max(1, bottom - top));
};

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
