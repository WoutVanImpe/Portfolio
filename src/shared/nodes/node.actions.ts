import type { Dispatch, SetStateAction } from "react";
import { addEdge, type Connection } from "@xyflow/react";
import type { ThemeName } from "@context/Theme";
import type { PortfolioEdge, PortfolioNode } from "./node.types";

type NodeKind = "theme" | "language";

export const ACTIVE_EDGE_CLASS = "edge--active";

export interface ConnectHandlerOptions {
	nodes: PortfolioNode[];
	setEdges: Dispatch<SetStateAction<PortfolioEdge[]>>;
	applyTheme?: (theme: ThemeName) => void;
	applyLanguage?: (language: string) => void;
}

const findEndpointValue = (connection: Connection, nodes: PortfolioNode[], kind: NodeKind): string | undefined => {
	for (const id of [connection.target, connection.source]) {
		const data = nodes.find((node) => node.id === id)?.data;

		if (data?.kind === kind && data.value) return data.value;
	}

	return undefined;
};

export const withActiveThemeEdge = (
	currentEdges: PortfolioEdge[],
	nodes: PortfolioNode[],
	theme: ThemeName,
): PortfolioEdge[] => {
	const source = nodes.find((node) => node.data.kind === "theme" && !node.data.value);
	const target = nodes.find((node) => node.data.kind === "theme" && node.data.value === theme);
	const remaining = currentEdges.filter((edge) => edge.data?.kind !== "theme");

	if (!source || !target) return remaining;

	return [
		...remaining,
		{
			id: `active-theme-${source.id}-${target.id}`,
			source: source.id,
			target: target.id,
			className: ACTIVE_EDGE_CLASS,
			data: { kind: "theme", active: true },
		},
	];
};

export const withActiveLanguageEdge = (
	currentEdges: PortfolioEdge[],
	nodes: PortfolioNode[],
	language: string,
): PortfolioEdge[] => {
	const source = nodes.find((node) => node.data.kind === "language" && !node.data.value);
	const target = nodes.find((node) => node.data.kind === "language" && node.data.value === language);
	const remaining = currentEdges.filter((edge) => edge.data?.kind !== "language");

	if (!source || !target) return remaining;

	return [
		...remaining,
		{
			id: `active-language-${source.id}-${target.id}`,
			source: source.id,
			target: target.id,
			data: { kind: "language", active: true },
		},
	];
};

export const handleConnect = (options: ConnectHandlerOptions, connection: Connection): void => {
	const { nodes, setEdges, applyTheme, applyLanguage } = options;
	const themeValue = findEndpointValue(connection, nodes, "theme");

	if (themeValue && applyTheme) {
		const theme = themeValue as ThemeName;
		applyTheme(theme);
		setEdges((current) => withActiveThemeEdge(current, nodes, theme));
		return;
	}

	const languageValue = findEndpointValue(connection, nodes, "language");
	if (languageValue && applyLanguage) {
		applyLanguage(languageValue);
		setEdges((current) => withActiveLanguageEdge(current, nodes, languageValue));
		return;
	}

	const targetIsDisplay = nodes.some((node) => node.id === connection.target && node.data.kind === "display");

	setEdges((current) => {
		const base = targetIsDisplay ? current.filter((edge) => edge.target !== connection.target) : current;

		return addEdge<PortfolioEdge>({ ...connection, data: { kind: "flow" } }, base);
	});
};
