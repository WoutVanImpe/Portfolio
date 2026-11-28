import { getProject, projectMatchesCategory, type ProjectCategory } from "@shared/data/projects";
import {
	getCableColorVar,
	getControlStates,
	getDisplayStates,
	naturalWidth,
	type DisplayView,
	type ModifierValue,
	type PortfolioEdge,
	type PortfolioNode,
} from "@shared/nodes";

type DisplayStates = ReturnType<typeof getDisplayStates>;
type ControlStates = ReturnType<typeof getControlStates>;

export const getFilteredOutNodeIds = (nodes: PortfolioNode[], activeCategory: ProjectCategory | null | undefined): Set<string> =>
	new Set(
		nodes
			.filter((node) => {
				if (node.data.kind !== "project" || !activeCategory) return false;
				const project = getProject(node.data.projectId);
				return project ? !projectMatchesCategory(project, activeCategory) : false;
			})
			.map((node) => node.id),
	);

export const getHandleColorMap = (edges: PortfolioEdge[]): { connectedHandles: string[]; handleColors: Record<string, string>; connectedNodeIds: Set<string> } => {
	const connectedHandles = new Set<string>();
	const colors: Record<string, string> = {};
	const connectedNodeIds = new Set<string>();

	for (const edge of edges) {
		const color = edge.data?.color
			? getCableColorVar(edge.data.color)
			: edge.data?.kind === "theme" && edge.data?.active
				? "var(--accent)"
				: "var(--cable-color)";

		for (const handle of [edge.sourceHandle, edge.targetHandle]) {
			if (handle) {
				connectedHandles.add(handle);
				colors[handle] = color;
			}
		}

		connectedNodeIds.add(edge.source);
		connectedNodeIds.add(edge.target);
	}

	return { connectedHandles: [...connectedHandles], handleColors: colors, connectedNodeIds };
};

export const getDisplayProjectSignature = (displayStates: DisplayStates): string =>
	Object.entries(displayStates)
		.map(([displayId, state]) => `${displayId}:${state?.project?.id ?? "none"}`)
		.sort()
		.join("|");

interface BuildRenderNodesContext {
	nodes: PortfolioNode[];
	widthOverrides: Record<string, number>;
	displayStates: DisplayStates;
	controlStates: ControlStates;
	mediaIndexes: Record<string, number>;
	displayViews: Record<string, DisplayView>;
	stepMedia: (displayId: string | undefined, delta: number) => void;
	setDisplayView: (displayId: string, view: DisplayView) => void;
	toggleModifier: (nodeId: string, value: ModifierValue) => void;
	connectedHandleList: string[];
	handleColorMap: Record<string, string>;
	connectedNodeIds: Set<string>;
	filteredOutNodeIds: Set<string>;
}

export const buildRenderNodes = ({
	nodes,
	widthOverrides,
	displayStates,
	controlStates,
	mediaIndexes,
	displayViews,
	stepMedia,
	setDisplayView,
	toggleModifier,
	connectedHandleList,
	handleColorMap,
	connectedNodeIds,
	filteredOutNodeIds,
}: BuildRenderNodesContext): PortfolioNode[] =>
	nodes.map((node) => {
		const width = widthOverrides[node.id] ?? naturalWidth(node);
		const styledNode = { ...node, style: { ...node.style, width, minWidth: width } };
		const connectedData = {
			...styledNode.data,
			connectedHandles: connectedHandleList,
			handleColors: handleColorMap,
			isConnected: connectedNodeIds.has(node.id),
			isFilteredOut: filteredOutNodeIds.has(node.id),
		};

		if (node.data.kind === "display") {
			const displayId = node.data.displayId;
			const state = displayStates[displayId];
			const mediaCount = state?.project?.media.length ?? 0;
			const mediaIndex = mediaCount > 0 ? Math.min(mediaIndexes[displayId] ?? 0, mediaCount - 1) : 0;

			return {
				...styledNode,
				data: {
					...connectedData,
					project: state?.project,
					status: state?.status,
					filter: state?.filter,
					mediaIndex,
					view: displayViews[displayId] ?? "media",
					onViewChange: (view: DisplayView) => setDisplayView(displayId, view),
				},
			};
		}

		if (node.data.kind === "control") {
			const state = controlStates[node.id];
			const displayId = state?.displayId;
			const project = state?.project;
			const mediaCount = project?.media.length ?? 0;
			const mediaIndex = displayId && mediaCount > 0 ? Math.min(mediaIndexes[displayId] ?? 0, mediaCount - 1) : 0;

			return {
				...styledNode,
				data: {
					...connectedData,
					project,
					mediaIndex,
					onPrevious: () => stepMedia(displayId, -1),
					onNext: () => stepMedia(displayId, 1),
				},
			};
		}

		if (node.data.kind === "modifier") {
			return {
				...styledNode,
				data: {
					...connectedData,
					onToggleModifier: (value: ModifierValue) => toggleModifier(node.id, value),
				},
			};
		}

		return { ...styledNode, data: connectedData };
	});

export const buildRenderEdges = (edges: PortfolioEdge[], filteredOutNodeIds: Set<string>): PortfolioEdge[] =>
	edges.map((edge) => ({
		...edge,
		hidden: edge.hidden || filteredOutNodeIds.has(edge.source) || filteredOutNodeIds.has(edge.target),
		type: "curved",
	}));
