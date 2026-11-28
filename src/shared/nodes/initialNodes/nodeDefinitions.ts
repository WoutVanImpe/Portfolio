import type { LocalizedText } from "@/i18n/localize";
import type { TranslationKey } from "@/i18n/resources";
import { projects } from "@shared/data/projects";
import type { ModifierValue, NodeHandleConfig } from "../node.types";

type NodeKind = "about" | "theme" | "language" | "project" | "display" | "control" | "modifier" | "filter";

export interface NodeDefinition {
	id: string;
	type: string;
	label?: string;
	labelKey?: TranslationKey;
	bodyKey?: TranslationKey;
	localizedLabel?: LocalizedText;
	projectId?: string;
	displayId?: string;
	kind?: NodeKind;
	value?: string;
	activeModifiers?: ModifierValue[];
	handles?: NodeHandleConfig[];
}

const passThroughHandles: NodeHandleConfig[] = [
	{ type: "target", position: "bottom" },
	{ type: "source", position: "bottom" },
];

const targetOnlyHandle: NodeHandleConfig[] = [{ type: "target", position: "bottom" }];

export const nodeDefinitions: NodeDefinition[] = [
	{
		id: "about-1",
		type: "about",
		labelKey: "about.label",
		bodyKey: "about.body",
		kind: "about",
	},
	...projects.map(
		(project): NodeDefinition => ({
			id: project.id,
			type: "project",
			kind: "project",
			localizedLabel: project.title,
			projectId: project.id,
			handles: [{ type: "source", position: "bottom" }],
		}),
	),

	{
		id: "language-5",
		type: "language",
		labelKey: "node.language",
		kind: "language",
		handles: [{ type: "source", position: "bottom" }],
	},
	{
		id: "languageItem-6",
		type: "languageItem",
		label: "Nederlands",
		kind: "language",
		value: "nl",
		handles: targetOnlyHandle,
	},
	{
		id: "languageItem-12",
		type: "languageItem",
		label: "English",
		kind: "language",
		value: "en",
		handles: targetOnlyHandle,
	},
	{
		id: "theme-9",
		type: "theme",
		labelKey: "node.theme",
		kind: "theme",
		handles: [{ type: "source", position: "bottom" }],
	},
	{
		id: "themeItem-10",
		type: "themeItem",
		labelKey: "theme.light",
		kind: "theme",
		value: "light",
		handles: targetOnlyHandle,
	},
	{
		id: "themeItem-11",
		type: "themeItem",
		labelKey: "theme.dark",
		kind: "theme",
		value: "dark",
		handles: targetOnlyHandle,
	},
	{
		id: "display-1",
		type: "display",
		labelKey: "node.display",
		kind: "display",
		displayId: "media",
	},
	{
		id: "link-7",
		type: "link",
		labelKey: "node.link",
		kind: "control",
	},
	{
		id: "switch-8",
		type: "switch",
		labelKey: "node.switch",
		kind: "control",
	},
	{
		id: "displayFilter-2",
		type: "displayFilter",
		labelKey: "node.displayFilter",
		kind: "modifier",
		activeModifiers: [],
		handles: passThroughHandles,
	},
	{
		id: "filter-3",
		type: "filter",
		labelKey: "node.filter",
		kind: "filter",
		handles: [{ type: "source", position: "bottom" }],
	},
	{
		id: "filterItem-4",
		type: "filterItem",
		labelKey: "category.web",
		kind: "filter",
		value: "web",
		handles: targetOnlyHandle,
	},
	{
		id: "filterItem-18",
		type: "filterItem",
		labelKey: "category.motion",
		kind: "filter",
		value: "motion",
		handles: targetOnlyHandle,
	},
	{
		id: "filterItem-19",
		type: "filterItem",
		labelKey: "category.design",
		kind: "filter",
		value: "design",
		handles: targetOnlyHandle,
	},
	{
		id: "filterItem-20",
		type: "filterItem",
		labelKey: "category.social",
		kind: "filter",
		value: "social",
		handles: targetOnlyHandle,
	},
	{
		id: "filterItem-21",
		type: "filterItem",
		labelKey: "category.mobile",
		kind: "filter",
		value: "mobile",
		handles: targetOnlyHandle,
	},
];
