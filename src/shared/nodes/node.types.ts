import type { Edge, Node, NodeProps } from "@xyflow/react";
import type { HandlerPosition } from "@shared/Handler";
import type { ThemeName } from "@context/Theme";
import type { TranslationKey } from "@/i18n/resources";

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
	handles?: NodeHandleConfig[];
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

export type PortfolioNodeData = PlainNodeData | ThemeNodeData | LanguageNodeData;

export type NodeData = PortfolioNodeData;

export type PortfolioNode = Node<PortfolioNodeData>;

export type PortfolioEdge = Edge;

export type PortfolioNodeProps = NodeProps<PortfolioNode>;
