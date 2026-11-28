import type { PortfolioNode } from "../node.types";
import { BLANK_MAX_ASPECT, MIN_BLANK_SIZE, MODULE_SEAM } from "./constants";
import { naturalHeight } from "./dimensions";
import type { BlankPanelRect, FrameRect, PackResult } from "./types";

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

export { fillBlanks };
