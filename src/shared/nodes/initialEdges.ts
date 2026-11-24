import type { PortfolioEdge } from "./node.types";

const firstProjectId = "project-14";
const projectSourceHandle = `${firstProjectId}-0-source`;

export const initialEdges: PortfolioEdge[] = [
	{
		id: "onboarding-project-media",
		source: firstProjectId,
		sourceHandle: projectSourceHandle,
		target: "display-1",
		targetHandle: "display-1-media-target",
		data: { kind: "flow" },
	},
	{
		id: "onboarding-project-text",
		source: firstProjectId,
		sourceHandle: projectSourceHandle,
		target: "textDisplay-13",
		targetHandle: "textDisplay-13-media-target",
		data: { kind: "flow" },
	},
	{
		id: "onboarding-media-link",
		source: "display-1",
		sourceHandle: "display-1-source-1-source",
		target: "link-7",
		targetHandle: "link-7-target",
		data: { kind: "flow" },
	},
	{
		id: "onboarding-media-switch",
		source: "display-1",
		sourceHandle: "display-1-source-2-source",
		target: "switch-8",
		targetHandle: "switch-8-target",
		data: { kind: "flow" },
	},
];
