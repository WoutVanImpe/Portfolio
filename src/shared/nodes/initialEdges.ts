import type { PortfolioEdge } from "./node.types";

const firstProjectId = "project-14";
const projectSourceHandle = `${firstProjectId}-0-source`;

export const initialEdges: PortfolioEdge[] = [
	{
		id: "onboarding-project-media",
		source: firstProjectId,
		sourceHandle: projectSourceHandle,
		target: "display-1",
		targetHandle: "display-node-target",
		data: { kind: "flow" },
	},
	{
		id: "onboarding-project-text",
		source: firstProjectId,
		sourceHandle: projectSourceHandle,
		target: "textDisplay-13",
		targetHandle: "display-node-target",
		data: { kind: "flow" },
	},
	{
		id: "onboarding-media-link",
		source: "display-1",
		sourceHandle: "display-node-1-source",
		target: "link-7",
		targetHandle: "link-node-target",
		data: { kind: "flow" },
	},
	{
		id: "onboarding-media-switch",
		source: "display-1",
		sourceHandle: "display-node-2-source",
		target: "switch-8",
		targetHandle: "switch-node-target",
		data: { kind: "flow" },
	},
];
