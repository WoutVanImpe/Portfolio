import type { PortfolioNode } from "../node.types";
import { fillBlanks } from "./blanks";
import {
	ABOUT_ID,
	DISPLAY_ID,
	FILTER_ID,
	FILTER_ITEM_IDS,
	FX_ID,
	FX_WIDTH,
	HP_STEP,
	LANGUAGE_ID,
	LANGUAGE_ITEM_IDS,
	LINK_ID,
	MIN_DISPLAY_WIDTH,
	MIN_LEFT_ZONE,
	MODULE_SEAM,
	STRETCHABLE_IDS,
	SWITCH_ID,
	THEME_ID,
	THEME_ITEM_IDS,
	TOP_RAIL_IDS,
	UNIT_1U,
	UNIT_1_5U,
	UNIT_1_75U,
	UNIT_3U,
	UNIT_4U,
} from "./constants";
import { naturalHeight, naturalWidth, projectBucket } from "./dimensions";
import type { CompactOptions, DeckOptions, NaturalWidths, PackResult, PackedPositions } from "./types";

const packDeck = (nodes: PortfolioNode[], naturalWidths: NaturalWidths, options: DeckOptions): PackResult => {
	const positions: PackedPositions = new Map();
	const widths: Map<string, number> = new Map();
	const byId = new Map(nodes.map((node) => [node.id, node]));
	const natural = (id: string): number => naturalWidths.get(id) ?? (byId.get(id) ? naturalWidth(byId.get(id)!) : 120);

	for (const node of nodes) widths.set(node.id, natural(node.id));

	const controlWidth = Math.max(natural(LINK_ID), natural(SWITCH_ID));
	widths.set(LINK_ID, controlWidth);
	widths.set(SWITCH_ID, controlWidth);
	widths.set(FX_ID, FX_WIDTH);
	widths.set(ABOUT_ID, natural(ABOUT_ID));

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
	const topIds = [LANGUAGE_ID, ...LANGUAGE_ITEM_IDS, THEME_ID, ...THEME_ITEM_IDS];
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
	widths.set(ABOUT_ID, natural(ABOUT_ID));

	const rightIds = options.controlsBelow ? [] : [LINK_ID, SWITCH_ID];
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
	positions.set(ABOUT_ID, { x: 0, y: -(UNIT_1_75U + MODULE_SEAM) });

	return { positions, widths, blanks: fillBlanks(nodes, positions, widths) };
};

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
	widths.set(ABOUT_ID, natural(ABOUT_ID));
	if (options.controlsRight) {
		const controlX = bottomFrameWidth + MODULE_SEAM;
		positions.set(LINK_ID, { x: controlX, y: bottomY });
		positions.set(SWITCH_ID, { x: controlX, y: bottomY + UNIT_1_5U + MODULE_SEAM });
	} else {
		const controlsY = displayY + UNIT_4U + MODULE_SEAM;
		positions.set(LINK_ID, { x: 0, y: controlsY });
		positions.set(SWITCH_ID, { x: controlWidth + MODULE_SEAM, y: controlsY });
	}
	positions.set(ABOUT_ID, { x: 0, y: -(UNIT_1_75U + MODULE_SEAM) });

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
	widths.set(ABOUT_ID, natural(ABOUT_ID));

	const projectNodes = nodes.filter((item) => item.data.kind === "project");
	const maxProjectRows = Math.floor((UNIT_4U + MODULE_SEAM) / (UNIT_1U + MODULE_SEAM));
	const projectRowCount = Math.min(projectNodes.length, maxProjectRows);
	const projectOrder = new Map(projectNodes.map((node, index) => [node.id, index]));
	const projectRows: PortfolioNode[][] = Array.from({ length: projectRowCount }, () => []);
	const projectRowLoads = Array<number>(projectRowCount).fill(0);

	for (const node of [...projectNodes].sort((a, b) => projectBucket(b) - projectBucket(a))) {
		const target = projectRowLoads.indexOf(Math.min(...projectRowLoads));
		projectRows[target].push(node);
		projectRowLoads[target] += projectBucket(node);
	}

	for (const row of projectRows) row.sort((a, b) => projectOrder.get(a.id)! - projectOrder.get(b.id)!);

	const desiredLeftZone = projectRows.reduce((max, row) => {
		const rowWidth = row.reduce((sum, node) => sum + projectBucket(node), 0) + Math.max(0, row.length - 1) * MODULE_SEAM;
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
	} else if (leftZoneWidth > desiredLeftZone) {
		displayWidth += leftZoneWidth - desiredLeftZone;
		leftZoneWidth = desiredLeftZone;
	}
	widths.set(DISPLAY_ID, displayWidth);

	let railX = 0;
	for (const id of TOP_RAIL_IDS) {
		positions.set(id, { x: railX, y: 0 });
		railX += widths.get(id)! + MODULE_SEAM;
	}

	const centerY = UNIT_1U + MODULE_SEAM;

	for (const [rowIndex, row] of projectRows.entries()) {
		const baseBuckets = row.map(projectBucket);
		const rowBuckets = [...baseBuckets];
		let remainder = leftZoneWidth - (rowBuckets.reduce((sum, value) => sum + value, 0) + Math.max(0, rowBuckets.length - 1) * MODULE_SEAM);

		while (remainder >= HP_STEP && rowBuckets.length > 0) {
			const index = rowBuckets.reduce((best, _value, position) => {
				const bestGain = rowBuckets[best] - baseBuckets[best];
				const gain = rowBuckets[position] - baseBuckets[position];
				return gain < bestGain ? position : best;
			}, 0);
			rowBuckets[index] += HP_STEP;
			remainder -= HP_STEP;
		}
		if (remainder > 0 && rowBuckets.length) rowBuckets[rowBuckets.length - 1] += remainder;

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
	positions.set(ABOUT_ID, { x: 0, y: -(UNIT_1_75U + MODULE_SEAM) });

	return { positions, widths, blanks: fillBlanks(nodes, positions, widths) };
};

export { packCompact, packDeck, packWide };
