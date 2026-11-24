import type { Edge, Node, NodeProps } from "@xyflow/react";
import type { HandlerPosition } from "@shared/Handler";
import type { ThemeName } from "@context/Theme";
import type { TranslationKey } from "@/i18n/resources";
import type { LocalizedText } from "@/i18n/localize";
import type { Project, ProjectCategory } from "@shared/data/projects";

export type NodeHandleType = "source" | "target";

export interface NodeHandleConfig {
	type: NodeHandleType;
	position: HandlerPosition;
	offsetTop?: number;
	offsetLeft?: number;
}

interface BaseNodeData extends Record<string, unknown> {
	label?: string;
	labelKey?: TranslationKey;
	localizedLabel?: LocalizedText;
	handles?: NodeHandleConfig[];
	connectedHandles?: string[];
	handleColors?: Record<string, string>;
	isConnected?: boolean;
	isFilteredOut?: boolean;
}

export interface PlainNodeData extends BaseNodeData {
	kind?: "plain";
}

export interface ThemeNodeData extends BaseNodeData {
	kind: "theme";
	value?: ThemeName;
}

export interface LanguageNodeData extends BaseNodeData {
	kind: "language";
	value?: string;
}

export interface ProjectNodeData extends BaseNodeData {
	kind: "project";
	projectId: string;
}

export type DisplayStatus = "empty" | "loading" | "error" | "ready";
export type ModifierValue = "grayscale" | "blur" | "contrast";

export interface DisplayNodeData extends BaseNodeData {
	kind: "display";
	displayId: string;
	variant?: "media" | "text";
	project?: Project;
	mediaIndex?: number;
	status?: DisplayStatus;
	filter?: string;
}

export interface ControlNodeData extends BaseNodeData {
	kind: "control";
	project?: Project;
	mediaIndex?: number;
	onPrevious?: () => void;
	onNext?: () => void;
}

export interface ModifierNodeData extends BaseNodeData {
	kind: "modifier";
	value?: ModifierValue;
}

export interface FilterNodeData extends BaseNodeData {
	kind: "filter";
	value?: ProjectCategory;
}

export type PortfolioNodeData =
	| PlainNodeData
	| ThemeNodeData
	| LanguageNodeData
	| ProjectNodeData
	| DisplayNodeData
	| ControlNodeData
	| ModifierNodeData
	| FilterNodeData;

export type NodeData = PortfolioNodeData;

export type PortfolioNode = Node<PortfolioNodeData>;

export interface PortfolioEdgeData extends Record<string, unknown> {
	kind?: "theme" | "language" | "flow" | "filter" | "modifier";
	active?: boolean;
}

export type PortfolioEdge = Edge<PortfolioEdgeData>;

export type PortfolioNodeProps = NodeProps<PortfolioNode>;
