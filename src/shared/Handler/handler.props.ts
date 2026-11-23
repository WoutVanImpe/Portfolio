import { Position } from "@xyflow/react";

export type HandlerPosition = "left" | "right" | "top" | "bottom";

export const POS_RECORD: Record<HandlerPosition, Position> = {
	left: Position.Left,
	right: Position.Right,
	top: Position.Top,
	bottom: Position.Bottom,
};

export interface HandlerProps {
	type: "target" | "source";
	id: string;
	position: HandlerPosition;
	/** Override the generated `${id}-${type}` id when an exact id is needed. */
	handleId?: string;
	offsetLeft?: number;
	offsetTop?: number;
	connected?: boolean;
	portLabel?: "IN" | "OUT";
}
