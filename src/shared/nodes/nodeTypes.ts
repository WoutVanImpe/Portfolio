import { AboutNode } from "./AboutNode";
import { CurvedEdge } from "./CurvedEdge";
import { DisplayNode } from "./DisplayNode";
import { LabelNode } from "./LabelNode";
import { LinkNode } from "./LinkNode";
import { SwitchNode } from "./SwitchNode";

export const nodeTypes = {
	about: AboutNode,
	display: DisplayNode,
	displayFilter: LabelNode,
	filter: LabelNode,
	filterItem: LabelNode,
	language: LabelNode,
	languageItem: LabelNode,
	link: LinkNode,
	project: LabelNode,
	switch: SwitchNode,
	theme: LabelNode,
	themeItem: LabelNode,
};

export const edgeTypes = {
	curved: CurvedEdge,
};
