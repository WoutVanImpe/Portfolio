import type { ThemeName } from "@context/Theme";
import type { NodeHandleConfig, PortfolioNode, PortfolioNodeData } from "./node.types";

interface NodeDefinition {
	type: string;
	label: string;
	kind?: "theme" | "language";
	value?: string;
	handles?: NodeHandleConfig[];
}

const nodeDefinitions: NodeDefinition[] = [
	{ type: "display", label: "Display" },
	{
		type: "displayFilter",
		label: "Display Filter",
		handles: [
			{ type: "target", position: "left" },
			{ type: "source", position: "right" },
		],
	},
	{
		type: "filter",
		label: "Filter",
		handles: [{ type: "source", position: "right", offsetLeft: 90, offsetTop: 90 }],
	},
	{
		type: "filterItem",
		label: "Filter Item",
		handles: [
			{ type: "target", position: "left" },
			{ type: "source", position: "right" },
		],
	},
	{
		type: "language",
		label: "Language",
		kind: "language",
		handles: [{ type: "source", position: "right" }],
	},
	{
		type: "languageItem",
		label: "Dutch",
		kind: "language",
		value: "nl",
		handles: [{ type: "target", position: "left" }],
	},
	{ type: "link", label: "Link" },
	{ type: "switch", label: "Switch" },
	{
		type: "theme",
		label: "Theme",
		kind: "theme",
		handles: [{ type: "source", position: "right" }],
	},
	{
		type: "themeItem",
		label: "Light Theme",
		kind: "theme",
		value: "light",
		handles: [{ type: "target", position: "left" }],
	},
	{
		type: "themeItem",
		label: "Dark Theme",
		kind: "theme",
		value: "dark",
		handles: [{ type: "target", position: "left" }],
	},
];

const toNodeData = ({ label, kind, value, handles }: NodeDefinition): PortfolioNodeData => {
	const common = { label, handles };

	if (kind === "theme") return { ...common, kind, value: value as ThemeName | undefined };
	if (kind === "language") return { ...common, kind, value };

	return common;
};

export const initialNodes: PortfolioNode[] = nodeDefinitions.map((definition, index) => ({
	id: `${definition.type}-${index + 1}`,
	type: definition.type,
	position: {
		x: (index % 2) * 220,
		y: Math.floor(index / 2) * 120,
	},
	data: toNodeData(definition),
}));
