import type { ThemeName } from "@context/Theme";
import type { TranslationKey } from "@/i18n/resources";
import type { NodeHandleConfig, PortfolioNode, PortfolioNodeData } from "./node.types";

interface NodeDefinition {
	type: string;
	label?: string;
	labelKey?: TranslationKey;
	kind?: "theme" | "language";
	value?: string;
	handles?: NodeHandleConfig[];
	position?: { x: number; y: number };
}

const nodeDefinitions: NodeDefinition[] = [
	{ type: "display", labelKey: "node.display" },
	{
		type: "displayFilter",
		labelKey: "node.displayFilter",
		handles: [
			{ type: "target", position: "left" },
			{ type: "source", position: "right" },
		],
	},
	{
		type: "filter",
		labelKey: "node.filter",
		handles: [{ type: "source", position: "right", offsetLeft: 90, offsetTop: 90 }],
	},
	{
		type: "filterItem",
		labelKey: "node.filterItem",
		handles: [
			{ type: "target", position: "left" },
			{ type: "source", position: "right" },
		],
	},
	{
		type: "language",
		labelKey: "node.language",
		kind: "language",
		handles: [{ type: "source", position: "right" }],
	},
	{
		type: "languageItem",
		label: "Nederlands",
		kind: "language",
		value: "nl",
		handles: [{ type: "target", position: "left" }],
	},
	{ type: "link", labelKey: "node.link" },
	{ type: "switch", labelKey: "node.switch" },
	{
		type: "theme",
		labelKey: "node.theme",
		kind: "theme",
		handles: [{ type: "source", position: "right" }],
	},
	{
		type: "themeItem",
		labelKey: "theme.light",
		kind: "theme",
		value: "light",
		handles: [{ type: "target", position: "left" }],
	},
	{
		type: "themeItem",
		labelKey: "theme.dark",
		kind: "theme",
		value: "dark",
		handles: [{ type: "target", position: "left" }],
	},
	{
		type: "languageItem",
		label: "English",
		kind: "language",
		value: "en",
		handles: [{ type: "target", position: "left" }],
		position: { x: 220, y: 300 },
	},
];

const toNodeData = ({ label, labelKey, kind, value, handles }: NodeDefinition): PortfolioNodeData => {
	const common = { label, labelKey, handles };

	if (kind === "theme") return { ...common, kind, value: value as ThemeName | undefined };
	if (kind === "language") return { ...common, kind, value };

	return common;
};

export const initialNodes: PortfolioNode[] = nodeDefinitions.map((definition, index) => ({
	id: `${definition.type}-${index + 1}`,
	type: definition.type,
	position: definition.position ?? {
		x: (index % 2) * 220,
		y: Math.floor(index / 2) * 120,
	},
	data: toNodeData(definition),
}));
