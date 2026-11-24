import type { ThemeName } from "@context/Theme";
import type { TranslationKey } from "@/i18n/resources";
import type { LocalizedText } from "@/i18n/localize";
import { projects } from "@shared/data/projects";
import type { ModifierValue, NodeHandleConfig, PortfolioNode, PortfolioNodeData } from "./node.types";
import type { ProjectCategory } from "@shared/data/projects";

type NodeKind = "theme" | "language" | "project" | "display" | "control" | "modifier" | "filter";

interface NodeDefinition {
	id: string;
	type: string;
	label?: string;
	labelKey?: TranslationKey;
	localizedLabel?: LocalizedText;
	projectId?: string;
	displayId?: string;
	variant?: "media" | "text";
	kind?: NodeKind;
	value?: string;
	activeModifiers?: ModifierValue[];
	handles?: NodeHandleConfig[];
	position: { x: number; y: number };
}

const passThroughHandles: NodeHandleConfig[] = [
	{ type: "target", position: "left" },
	{ type: "source", position: "right" },
];

const targetOnlyHandle: NodeHandleConfig[] = [{ type: "target", position: "left" }];

const nodeDefinitions: NodeDefinition[] = [
	// Language cluster — top right
	{
		id: "language-5",
		type: "language",
		labelKey: "node.language",
		kind: "language",
		handles: [{ type: "source", position: "right" }],
		position: { x: 1000, y: 0 },
	},
	{
		id: "languageItem-6",
		type: "languageItem",
		label: "Nederlands",
		kind: "language",
		value: "nl",
		handles: targetOnlyHandle,
		position: { x: 1160, y: 0 },
	},
	{
		id: "languageItem-12",
		type: "languageItem",
		label: "English",
		kind: "language",
		value: "en",
		handles: targetOnlyHandle,
		position: { x: 1160, y: 80 },
	},

	// Theme cluster — top right
	{
		id: "theme-9",
		type: "theme",
		labelKey: "node.theme",
		kind: "theme",
		handles: [{ type: "source", position: "right" }],
		position: { x: 1000, y: 220 },
	},
	{
		id: "themeItem-10",
		type: "themeItem",
		labelKey: "theme.light",
		kind: "theme",
		value: "light",
		handles: targetOnlyHandle,
		position: { x: 1160, y: 220 },
	},
	{
		id: "themeItem-11",
		type: "themeItem",
		labelKey: "theme.dark",
		kind: "theme",
		value: "dark",
		handles: targetOnlyHandle,
		position: { x: 1160, y: 300 },
	},

	// Displays and navigation — middle
	{
		id: "display-1",
		type: "display",
		labelKey: "node.display",
		kind: "display",
		displayId: "media",
		variant: "media",
		position: { x: 300, y: 240 },
	},
	{
		id: "textDisplay-13",
		type: "textDisplay",
		labelKey: "node.display",
		kind: "display",
		displayId: "text",
		variant: "text",
		position: { x: 300, y: 460 },
	},
	{
		id: "link-7",
		type: "link",
		labelKey: "node.link",
		kind: "control",
		position: { x: 580, y: 240 },
	},
	{
		id: "switch-8",
		type: "switch",
		labelKey: "node.switch",
		kind: "control",
		position: { x: 580, y: 340 },
	},

	// Effects — right
	{
		id: "displayFilter-2",
		type: "displayFilter",
		labelKey: "node.displayFilter",
		kind: "modifier",
		activeModifiers: [],
		handles: passThroughHandles,
		position: { x: 860, y: 480 },
	},

	// Category filters — right
	{
		id: "filter-3",
		type: "filter",
		labelKey: "node.filter",
		kind: "filter",
		handles: [{ type: "source", position: "right", offsetLeft: 90, offsetTop: 90 }],
		position: { x: 1080, y: 480 },
	},
	{
		id: "filterItem-4",
		type: "filterItem",
		labelKey: "category.web",
		kind: "filter",
		value: "web",
		handles: targetOnlyHandle,
		position: { x: 1240, y: 480 },
	},
	{
		id: "filterItem-18",
		type: "filterItem",
		labelKey: "category.motion",
		kind: "filter",
		value: "motion",
		handles: targetOnlyHandle,
		position: { x: 1240, y: 560 },
	},
	{
		id: "filterItem-19",
		type: "filterItem",
		labelKey: "category.design",
		kind: "filter",
		value: "design",
		handles: targetOnlyHandle,
		position: { x: 1240, y: 640 },
	},
	{
		id: "filterItem-20",
		type: "filterItem",
		labelKey: "category.social",
		kind: "filter",
		value: "social",
		handles: targetOnlyHandle,
		position: { x: 1240, y: 720 },
	},

	// Projects — right
	...projects.map(
		(project, index): NodeDefinition => ({
			id: `project-${index + 14}`,
			type: "project",
			kind: "project",
			localizedLabel: project.title,
			projectId: project.id,
			handles: [{ type: "source", position: "right" }],
			position: { x: 860, y: 840 + index * 120 },
		}),
	),
];

const toNodeData = (definition: NodeDefinition): PortfolioNodeData => {
	const { label, labelKey, localizedLabel, projectId, displayId, variant, kind, value, activeModifiers, handles } = definition;
	const common = { label, labelKey, localizedLabel, handles };

	if (kind === "theme") return { ...common, kind, value: value as ThemeName | undefined };
	if (kind === "language") return { ...common, kind, value };
	if (kind === "project") return { ...common, kind, projectId: projectId ?? "" };
	if (kind === "display") return { ...common, kind, displayId: displayId ?? "", variant };
	if (kind === "control") return { ...common, kind };
	if (kind === "modifier") return { ...common, kind, activeModifiers: activeModifiers ?? [] };
	if (kind === "filter") return { ...common, kind, value: value as ProjectCategory | undefined };

	return common;
};

export const initialNodes: PortfolioNode[] = nodeDefinitions.map((definition) => ({
	id: definition.id,
	type: definition.type,
	position: definition.position,
	data: toNodeData(definition),
}));
