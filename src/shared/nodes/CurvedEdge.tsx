import { BaseEdge, type EdgeProps } from "@xyflow/react";
import { getCableColorVar, type PortfolioEdge } from "./node.types";

export const CurvedEdge = ({ sourceX, sourceY, targetX, targetY, markerStart, markerEnd, style, interactionWidth, data }: EdgeProps<PortfolioEdge>) => {
	const horizontalSpan = Math.abs(targetX - sourceX);
	const verticalSpan = Math.abs(targetY - sourceY);
	const dip = Math.max(24, Math.min(72, horizontalSpan * 0.3 + verticalSpan * 0.1));

	const path = `M ${sourceX},${sourceY} C ${sourceX},${sourceY + dip} ${targetX},${targetY + dip} ${targetX},${targetY}`;
	const labelX = (sourceX + targetX) / 2;
	const labelY = (sourceY + targetY) / 2 + dip * 0.75;
	const edgeStyle = data?.color ? { ...style, stroke: getCableColorVar(data.color) } : style;

	return (
		<>
			<path d={path} className="react-flow__edge-shadow" fill="none" />
			<BaseEdge path={path} labelX={labelX} labelY={labelY} markerStart={markerStart} markerEnd={markerEnd} style={edgeStyle} interactionWidth={interactionWidth} />
			<path d={path} className="react-flow__edge-highlight" fill="none" />
		</>
	);
};
