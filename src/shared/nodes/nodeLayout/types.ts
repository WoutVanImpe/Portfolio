import type { RackLayout } from "../node.types";

export interface Position {
	x: number;
	y: number;
}

export type PackedPositions = Map<string, Position>;
export type NaturalWidths = Map<string, number>;

export interface BlankPanelRect {
	id: string;
	x: number;
	y: number;
	width: number;
	height: number;
}

export interface FrameRect {
	x: number;
	y: number;
	width: number;
	height: number;
}

export interface PackResult {
	positions: PackedPositions;
	widths: Map<string, number>;
	blanks: BlankPanelRect[];
}

export interface DeckOptions {
	filterVertical: boolean;
	projectColumns: number;
	stackDisplay: boolean;
	controlsBelow: boolean;
}

export interface CompactOptions {
	targetWidth: number;
	stackDisplay: boolean;
	controlsRight: boolean;
}

export interface Candidate {
	packed: PackResult;
	scale: number;
	fillerRatio: number;
	blankCount: number;
}

export type { RackLayout };
