import type { ThemeName } from "@context/Theme";
import type { ProjectCategory } from "@shared/data/projects";
import type { PortfolioNode, PortfolioNodeData, RackLayout } from "../node.types";
import { nodeDefinitions, type NodeDefinition } from "./nodeDefinitions";
import { rackSlots, slotToPosition } from "./rackSlots";

const toNodeData = (definition: NodeDefinition): PortfolioNodeData => {
	const { label, labelKey, bodyKey, localizedLabel, projectId, displayId, kind, value, activeModifiers, handles } = definition;
	const common = { label, labelKey, localizedLabel, handles };

	if (kind === "about") return { ...common, kind, bodyKey: bodyKey ?? "about.body" };
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

export { getHardwareCode } from "./hardwareCodes";
export { getRackLayout } from "./rackSlots";
export type { RackLayout } from "../node.types";
