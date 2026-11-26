import type { ThemeName } from "@context/Theme";
import type { TranslationKey } from "@/i18n/resources";
import type { LocalizedText } from "@/i18n/localize";
import { projects } from "@shared/data/projects";
import type { ModifierValue, NodeHandleConfig, PortfolioNode, PortfolioNodeData } from "./node.types";
import type { ProjectCategory } from "@shared/data/projects";

type NodeKind = "theme" | "language" | "project" | "display" | "control" | "modifier" | "filter";
export type RackLayout = "wide" | "standard" | "tall";

interface GridSlot {
	col: number;
	row: number;
}

interface NodeDefinition {
	id: string;
	type: string;
	label?: string;
	labelKey?: TranslationKey;
	localizedLabel?: LocalizedText;
	projectId?: string;
	displayId?: string;
	kind?: NodeKind;
	value?: string;
	activeModifiers?: ModifierValue[];
	handles?: NodeHandleConfig[];
}

const GRID_UNIT = 20;

const rackSlots: Record<RackLayout, Record<string, GridSlot>> = {
	wide: {
		"filter-3": { col: 0, row: 6 },
		"filterItem-4": { col: 0, row: 11 },
		"filterItem-18": { col: 0, row: 16 },
		"filterItem-19": { col: 0, row: 21 },
		"filterItem-20": { col: 0, row: 26 },
		"filterItem-21": { col: 0, row: 31 },
		bluebeard: { col: 7, row: 6 },
		"once-upon-a-time": { col: 17, row: 6 },
		"trifold-flyer": { col: 7, row: 11 },
		"social-media": { col: 17, row: 11 },
		"drone-video": { col: 7, row: 16 },
		"het-kikkertje": { col: 17, row: 16 },
		sproutspot: { col: 7, row: 21 },
		"jnm-forum": { col: 17, row: 21 },
		"wdm-project": { col: 7, row: 26 },
		"display-1": { col: 28, row: 6 },
		"link-7": { col: 55, row: 6 },
		"switch-8": { col: 62, row: 6 },
		"displayFilter-2": { col: 55, row: 14 },
		"language-5": { col: 28, row: 0 },
		"languageItem-6": { col: 34, row: 0 },
		"languageItem-12": { col: 40, row: 0 },
		"theme-9": { col: 46, row: 0 },
		"themeItem-10": { col: 52, row: 0 },
		"themeItem-11": { col: 58, row: 0 },
	},
	standard: {
		"filter-3": { col: 0, row: 6 },
		"filterItem-4": { col: 0, row: 11 },
		"filterItem-18": { col: 0, row: 16 },
		"filterItem-19": { col: 0, row: 21 },
		"filterItem-20": { col: 0, row: 26 },
		"filterItem-21": { col: 0, row: 31 },
		bluebeard: { col: 7, row: 6 },
		"once-upon-a-time": { col: 17, row: 6 },
		"trifold-flyer": { col: 7, row: 11 },
		"social-media": { col: 17, row: 11 },
		"drone-video": { col: 7, row: 16 },
		"het-kikkertje": { col: 17, row: 16 },
		sproutspot: { col: 7, row: 21 },
		"jnm-forum": { col: 17, row: 21 },
		"wdm-project": { col: 7, row: 26 },
		"display-1": { col: 28, row: 6 },
		"link-7": { col: 55, row: 6 },
		"switch-8": { col: 55, row: 13 },
		"displayFilter-2": { col: 55, row: 20 },
		"language-5": { col: 21, row: 0 },
		"languageItem-6": { col: 27, row: 0 },
		"languageItem-12": { col: 33, row: 0 },
		"theme-9": { col: 39, row: 0 },
		"themeItem-10": { col: 45, row: 0 },
		"themeItem-11": { col: 51, row: 0 },
	},
	tall: {
		"filter-3": { col: 0, row: 9 },
		"filterItem-4": { col: 0, row: 14 },
		"filterItem-18": { col: 0, row: 19 },
		"filterItem-19": { col: 0, row: 24 },
		"filterItem-20": { col: 0, row: 29 },
		"filterItem-21": { col: 0, row: 34 },
		bluebeard: { col: 6, row: 9 },
		"once-upon-a-time": { col: 18, row: 9 },
		"trifold-flyer": { col: 6, row: 14 },
		"social-media": { col: 18, row: 14 },
		"drone-video": { col: 6, row: 19 },
		"het-kikkertje": { col: 18, row: 19 },
		sproutspot: { col: 6, row: 24 },
		"jnm-forum": { col: 18, row: 24 },
		"wdm-project": { col: 6, row: 29 },
		"display-1": { col: 25, row: 9 },
		"link-7": { col: 25, row: 45 },
		"switch-8": { col: 32, row: 45 },
		"displayFilter-2": { col: 25, row: 52 },
		"language-5": { col: 25, row: 0 },
		"languageItem-6": { col: 31, row: 0 },
		"languageItem-12": { col: 37, row: 0 },
		"theme-9": { col: 25, row: 4 },
		"themeItem-10": { col: 31, row: 4 },
		"themeItem-11": { col: 37, row: 4 },
	},
};

const slotToPosition = ({ col, row }: GridSlot) => ({
	x: col * GRID_UNIT,
	y: row * GRID_UNIT,
});

export const getRackLayout = (width: number, height: number): RackLayout => {
	if (height === 0) return "wide";

	const ratio = width / height;
	if (ratio >= 1.9) return "wide";
	if (ratio >= 1.45) return "standard";
	return "tall";
};

const passThroughHandles: NodeHandleConfig[] = [
	{ type: "target", position: "bottom" },
	{ type: "source", position: "bottom" },
];

const targetOnlyHandle: NodeHandleConfig[] = [{ type: "target", position: "bottom" }];

const nodeDefinitions: NodeDefinition[] = [
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

const PROJECT_IDS = projects.map((project) => project.id);
const FILTER_IDS = ["filter-3", "filterItem-4", "filterItem-18", "filterItem-19", "filterItem-20", "filterItem-21"];
const SYSTEM_IDS = ["language-5", "languageItem-6", "languageItem-12", "theme-9", "themeItem-10", "themeItem-11"];
const SINGLE_CODES: Record<string, string> = {
	"display-1": "DSP-01",
	"displayFilter-2": "FX-01",
	"link-7": "LNK-01",
	"switch-8": "SW-01",
};

const codeNumber = (index: number): string => String(index + 1).padStart(2, "0");

export const getHardwareCode = (id: string): string => {
	const projectIndex = PROJECT_IDS.indexOf(id);
	if (projectIndex >= 0) return `PRJ-${codeNumber(projectIndex)}`;

	const filterIndex = FILTER_IDS.indexOf(id);
	if (filterIndex >= 0) return `FLT-${codeNumber(filterIndex)}`;

	const systemIndex = SYSTEM_IDS.indexOf(id);
	if (systemIndex >= 0) return `SYS-${codeNumber(systemIndex)}`;

	return SINGLE_CODES[id] ?? "MOD-01";
};

const toNodeData = (definition: NodeDefinition): PortfolioNodeData => {
	const { label, labelKey, localizedLabel, projectId, displayId, kind, value, activeModifiers, handles } = definition;
	const common = { label, labelKey, localizedLabel, handles };

	if (kind === "theme") return { ...common, kind, value: value as ThemeName | undefined };
	if (kind === "language") return { ...common, kind, value };
	if (kind === "project") return { ...common, kind, projectId: projectId ?? "" };
	if (kind === "display") return { ...common, kind, displayId: displayId ?? "" };
	if (kind === "control") return { ...common, kind };
	if (kind === "modifier") return { ...common, kind, activeModifiers: activeModifiers ?? [] };
	if (kind === "filter") return { ...common, kind, value: value as ProjectCategory | undefined };

	return common;
};

export const createNodes = (layout: RackLayout): PortfolioNode[] =>
	nodeDefinitions.map((definition) => ({
		id: definition.id,
		type: definition.type,
		data: toNodeData(definition),
		position: slotToPosition(rackSlots[layout][definition.id] ?? { col: 0, row: 0 }),
	}));

export const initialNodes: PortfolioNode[] = createNodes("wide");
