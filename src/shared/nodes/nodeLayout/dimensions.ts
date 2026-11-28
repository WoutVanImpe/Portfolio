import { getProject } from "@shared/data/projects";
import type { PortfolioNode } from "../node.types";
import { ABOUT_WIDTH, FX_WIDTH, SWITCH_ID, UNIT_1_5U, UNIT_1U, UNIT_1_75U, UNIT_3U, UNIT_4U } from "./constants";

export const naturalWidth = (node: PortfolioNode): number => {
	if (node.data.kind === "about") return ABOUT_WIDTH;
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
	if (node.data.kind === "about") return UNIT_1_75U;
	if (node.data.kind === "display") return UNIT_4U;
	if (node.data.kind === "modifier") return UNIT_3U;
	if (node.data.kind === "control") return UNIT_1_5U;
	return UNIT_1U;
};

export const projectBucket = (node: PortfolioNode): number => {
	if (node.data.kind !== "project") return 148;

	const title = node.data.localizedLabel ?? getProject(node.data.projectId)?.title;
	const length = Math.max(title?.nl.length ?? 0, title?.en.length ?? 0);
	if (length <= 12) return 148;
	if (length <= 20) return 176;
	return 204;
};
