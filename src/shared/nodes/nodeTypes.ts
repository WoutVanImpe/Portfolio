import { DisplayNode } from "./DisplayNode";
import { LabelNode } from "./LabelNode";
import { LinkNode } from "./LinkNode";
import { SwitchNode } from "./SwitchNode";

export const nodeTypes = {
	display: DisplayNode,
	displayFilter: LabelNode,
	filter: LabelNode,
	filterItem: LabelNode,
	language: LabelNode,
	languageItem: LabelNode,
	link: LinkNode,
	switch: SwitchNode,
	theme: LabelNode,
	themeItem: LabelNode,
};
