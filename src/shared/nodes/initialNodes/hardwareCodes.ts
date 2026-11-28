import { projects } from "@shared/data/projects";

const PROJECT_IDS = projects.map((project) => project.id);
const FILTER_IDS = ["filter-3", "filterItem-4", "filterItem-18", "filterItem-19", "filterItem-20", "filterItem-21"];
const SYSTEM_IDS = ["language-5", "languageItem-6", "languageItem-12", "theme-9", "themeItem-10", "themeItem-11"];
const SINGLE_CODES: Record<string, string> = {
	"display-1": "DSP-01",
	"displayFilter-2": "FX-01",
	"link-7": "LNK-01",
	"switch-8": "SW-01",
};

const codeNumber = (index: number): string => String(index + 1).padStart(2, "0");

export const getHardwareCode = (id: string): string => {
	const projectIndex = PROJECT_IDS.indexOf(id);
	if (projectIndex >= 0) return `PRJ-${codeNumber(projectIndex)}`;

	const filterIndex = FILTER_IDS.indexOf(id);
	if (filterIndex >= 0) return `FLT-${codeNumber(filterIndex)}`;

	const systemIndex = SYSTEM_IDS.indexOf(id);
	if (systemIndex >= 0) return `SYS-${codeNumber(systemIndex)}`;

	return SINGLE_CODES[id] ?? "MOD-01";
};
