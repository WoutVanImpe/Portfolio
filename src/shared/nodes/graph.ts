import { getProject, type Project, type ProjectCategory } from "@shared/data/projects";
import type { Connection } from "@xyflow/react";
import type { DisplayStatus, ModifierValue, PortfolioEdge, PortfolioNode } from "./node.types";

export interface DisplayState {
	project?: Project;
	status: DisplayStatus;
	modifiers?: ModifierValue[];
	filter?: string;
}

export interface ControlState extends DisplayState {
	displayId?: string;
}

const getNode = (nodes: PortfolioNode[], id: string | null | undefined): PortfolioNode | undefined =>
	nodes.find((node) => node.id === id);

const isFlowEdge = (edge: PortfolioEdge): boolean =>
	edge.data?.kind === undefined || edge.data.kind === "flow" || edge.data.kind === "modifier";

const findUpstreamProject = (
	nodes: PortfolioNode[],
	edges: PortfolioEdge[],
	nodeId: string,
	visited: Set<string> = new Set(),
): Project | undefined => {
	if (visited.has(nodeId)) return undefined;
	visited.add(nodeId);

	for (const edge of edges.filter((item) => item.target === nodeId && isFlowEdge(item))) {
		const source = getNode(nodes, edge.source);
		if (!source) continue;

		if (source.data.kind === "project") {
			const project = getProject(source.data.projectId);
			if (project) return project;
		}

		if (source.data.kind === "modifier") {
			const project = findUpstreamProject(nodes, edges, source.id, visited);
			if (project) return project;
		}
	}

	return undefined;
};

const findUpstreamModifiers = (
	nodes: PortfolioNode[],
	edges: PortfolioEdge[],
	nodeId: string,
	visited: Set<string> = new Set(),
): ModifierValue[] => {
	if (visited.has(nodeId)) return [];
	visited.add(nodeId);

	const modifiers: ModifierValue[] = [];

	for (const edge of edges.filter((item) => item.target === nodeId && isFlowEdge(item))) {
		const source = getNode(nodes, edge.source);
		if (!source) continue;

		if (source.data.kind === "modifier") {
			modifiers.push(...(source.data.activeModifiers ?? []));
			modifiers.push(...findUpstreamModifiers(nodes, edges, source.id, visited));
		}
	}

	return Array.from(new Set(modifiers));
};

const findUpstreamDisplay = (
	nodes: PortfolioNode[],
	edges: PortfolioEdge[],
	nodeId: string,
	visited: Set<string> = new Set(),
): PortfolioNode | undefined => {
	if (visited.has(nodeId)) return undefined;
	visited.add(nodeId);

	for (const edge of edges.filter((item) => item.target === nodeId && isFlowEdge(item))) {
		const source = getNode(nodes, edge.source);
		if (!source) continue;

		if (source.data.kind === "display") return source;

		if (source.data.kind === "modifier") {
			const display = findUpstreamDisplay(nodes, edges, source.id, visited);
			if (display) return display;
		}
	}

	return undefined;
};

export const getActiveCategoryFilter = (nodes: PortfolioNode[], edges: PortfolioEdge[]): ProjectCategory | undefined => {
	const hubIds = new Set(
		nodes.filter((node) => node.data.kind === "filter" && !node.data.value).map((node) => node.id),
	);
	const activeEdge = edges.find((edge) => edge.data?.kind === "filter" && hubIds.has(edge.source));
	const target = getNode(nodes, activeEdge?.target);

	return target?.data.kind === "filter" && target.data.value ? target.data.value : undefined;
};

const effectStyles: Record<ModifierValue, string> = {
	grayscale: "grayscale(1)",
	blur: "blur(2px)",
	contrast: "contrast(1.25)",
};

export const toCssFilter = (modifiers: ModifierValue[] = []): string | undefined => {
	const filter = modifiers.map((modifier) => effectStyles[modifier]).filter(Boolean).join(" ");

	return filter || undefined;
};

export const getDisplayStates = (nodes: PortfolioNode[], edges: PortfolioEdge[]): Record<string, DisplayState> => {
	const states: Record<string, DisplayState> = {};
	const activeCategory = getActiveCategoryFilter(nodes, edges);

	for (const node of nodes) {
		if (node.data.kind !== "display") continue;

		const upstreamProject = findUpstreamProject(nodes, edges, node.id);
		const project = activeCategory && upstreamProject?.category !== activeCategory ? undefined : upstreamProject;
		const modifiers = findUpstreamModifiers(nodes, edges, node.id);
		const status: DisplayStatus = !project ? "empty" : project.media.length === 0 ? "error" : "ready";

		states[node.data.displayId] = { project, status, modifiers, filter: toCssFilter(modifiers) };
	}

	return states;
};

export const getControlStates = (nodes: PortfolioNode[], edges: PortfolioEdge[]): Record<string, ControlState> => {
	const displayStates = getDisplayStates(nodes, edges);
	const states: Record<string, ControlState> = {};

	for (const node of nodes) {
		if (node.data.kind !== "control") continue;

		const display = findUpstreamDisplay(nodes, edges, node.id);
		if (display?.data.kind !== "display") continue;

		states[node.id] = {
			...(displayStates[display.data.displayId] ?? { status: "empty" }),
			displayId: display.data.displayId,
		};
	}

	return states;
};

const hasPath = (from: string, to: string, edges: PortfolioEdge[], visited: Set<string> = new Set()): boolean => {
	if (from === to) return true;
	if (visited.has(from)) return false;
	visited.add(from);

	return edges
		.filter((edge) => edge.source === from && isFlowEdge(edge))
		.some((edge) => hasPath(edge.target, to, edges, visited));
};

export const isValidConnection = (
	connection: Connection | PortfolioEdge,
	nodes: PortfolioNode[],
	edges: PortfolioEdge[],
): boolean => {
	if (!connection.source || !connection.target || connection.source === connection.target) return false;

	const source = getNode(nodes, connection.source);
	const target = getNode(nodes, connection.target);
	if (!source || !target) return false;

	const sourceKind = source.data.kind;
	const targetKind = target.data.kind;

	if (sourceKind === "theme" && targetKind === "theme") {
		return !source.data.value && Boolean(target.data.value);
	}

	if (sourceKind === "language" && targetKind === "language") {
		return !source.data.value && Boolean(target.data.value);
	}

	if (sourceKind === "filter" && targetKind === "filter") {
		return !source.data.value && Boolean(target.data.value);
	}

	if (hasPath(target.id, source.id, edges)) return false;

	if (sourceKind === "project") return targetKind === "display" || targetKind === "modifier";
	if (sourceKind === "display") return targetKind === "control";
	if (sourceKind === "modifier") return targetKind === "display" || targetKind === "modifier" || targetKind === "control";

	return false;
};
