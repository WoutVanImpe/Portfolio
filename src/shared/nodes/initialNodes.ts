import type { ThemeName } from "@context/Theme";
import type { TranslationKey } from "@/i18n/resources";
import { projects } from "@shared/data/projects";
import type { LocalizedText } from "@/i18n/localize";
import type { NodeHandleConfig, PortfolioNode, PortfolioNodeData } from "./node.types";

type NodeKind = "theme" | "language" | "project" | "display" | "control" | "modifier" | "filter";

interface NodeDefinition {
	type: string;
	label?: string;
	labelKey?: TranslationKey;
	localizedLabel?: LocalizedText;
	projectId?: string;
	displayId?: string;
	variant?: "media" | "text";
	kind?: NodeKind;
	value?: string;
	handles?: NodeHandleConfig[];
	position?: { x: number; y: number };
}

const nodeDefinitions: NodeDefinition[] = [
	{
		type: "display",
		labelKey: "node.display",
		kind: "display",
		displayId: "media",
		variant: "media",
	},
	{
		type: "displayFilter",
		labelKey: "node.displayFilter",
		kind: "modifier",
		handles: [
			{ type: "target", position: "left" },
			{ type: "source", position: "right" },
		],
	},
	{
		type: "filter",
		labelKey: "node.filter",
		kind: "filter",
		handles: [{ type: "source", position: "right", offsetLeft: 90, offsetTop: 90 }],
	},
	{
		type: "filterItem",
		labelKey: "node.filterItem",
		kind: "filter",
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
	{ type: "link", labelKey: "node.link", kind: "control" },
	{ type: "switch", labelKey: "node.switch", kind: "control" },
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
	{
		type: "textDisplay",
		labelKey: "node.display",
		kind: "display",
		displayId: "text",
		variant: "text",
		position: { x: 220, y: 720 },
	},
	...projects.map(
		(project, index): NodeDefinition => ({
			type: "project",
			kind: "project",
			localizedLabel: project.title,
			projectId: project.id,
			handles: [{ type: "source", position: "right" }],
			position: { x: 0, y: 840 + index * 120 },
		}),
	),
];

const toNodeData = (definition: NodeDefinition): PortfolioNodeData => {
	const { label, labelKey, localizedLabel, projectId, displayId, variant, kind, value, handles } = definition;
	const common = { label, labelKey, localizedLabel, handles };

	if (kind === "theme") return { ...common, kind, value: value as ThemeName | undefined };
	if (kind === "language") return { ...common, kind, value };
	if (kind === "project") return { ...common, kind, projectId: projectId! };
	if (kind === "display") return { ...common, kind, displayId: displayId!, variant };
	if (kind === "control") return { ...common, kind };
	if (kind === "modifier") return { ...common, kind, value };
	if (kind === "filter") return { ...common, kind, value };

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
