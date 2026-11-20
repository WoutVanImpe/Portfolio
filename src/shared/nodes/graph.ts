import { getProject, type Project } from "@shared/data/projects";
import type { Connection } from "@xyflow/react";
import type { DisplayStatus, PortfolioEdge, PortfolioNode } from "./node.types";

export interface DisplayState {
	project?: Project;
	status: DisplayStatus;
}

export interface ControlState extends DisplayState {
	displayId?: string;
}

const getNode = (nodes: PortfolioNode[], id: string | null | undefined): PortfolioNode | undefined =>
	nodes.find((node) => node.id === id);

const isFlowEdge = (edge: PortfolioEdge): boolean =>
	edge.data?.kind === undefined || edge.data.kind === "flow" || edge.data.kind === "modifier" || edge.data.kind === "filter";

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

		if (source.data.kind === "modifier" || source.data.kind === "filter") {
			const project = findUpstreamProject(nodes, edges, source.id, visited);
			if (project) return project;
		}
	}

	return undefined;
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

		if (source.data.kind === "modifier" || source.data.kind === "filter") {
			const display = findUpstreamDisplay(nodes, edges, source.id, visited);
			if (display) return display;
		}
	}

	return undefined;
};

export const getDisplayStates = (nodes: PortfolioNode[], edges: PortfolioEdge[]): Record<string, DisplayState> => {
	const states: Record<string, DisplayState> = {};

	for (const node of nodes) {
		if (node.data.kind !== "display") continue;

		const project = findUpstreamProject(nodes, edges, node.id);
		const status: DisplayStatus = !project ? "empty" : project.media.length === 0 ? "error" : "ready";

		states[node.data.displayId] = { project, status };
	}

	return states;
};

export const getPrimaryDisplayState = (
	nodes: PortfolioNode[],
	edges: PortfolioEdge[],
): DisplayState | undefined => {
	const states = getDisplayStates(nodes, edges);
	const mediaDisplay = nodes.find((node) => node.data.kind === "display" && node.data.variant === "media");

	return mediaDisplay?.data.kind === "display" ? states[mediaDisplay.data.displayId] : undefined;
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

	if (hasPath(target.id, source.id, edges)) return false;

	if (sourceKind === "project") return targetKind === "display" || targetKind === "modifier";
	if (sourceKind === "display") return targetKind === "control";
	if (sourceKind === "modifier") return targetKind === "display" || targetKind === "modifier" || targetKind === "control";
	if (sourceKind === "filter") return targetKind === "filter" || targetKind === "modifier" || targetKind === "display";

	return false;
};
