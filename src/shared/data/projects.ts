import image from "@assets/test-image.jpeg";
import type { LocalizedText } from "@/i18n/localize";

export type ProjectCategory = "web" | "motion" | "design" | "social";

export interface ProjectMedia {
	type: "image" | "video";
	src: string;
	alt?: LocalizedText;
}

export interface Project {
	id: string;
	title: LocalizedText;
	description: LocalizedText;
	category: ProjectCategory;
	liveUrl: string;
	media: ProjectMedia[];
}

export const projects: Project[] = [
	{
		id: "portfolio-one",
		title: { en: "First project", nl: "Eerste project" },
		description: {
			en: "A short description of the first project.",
			nl: "Een korte beschrijving van het eerste project.",
		},
		category: "web",
		liveUrl: "https://example.com",
		media: [
			{
				type: "image",
				src: image,
				alt: { en: "First project preview", nl: "Voorbeeld van het eerste project" },
			},
		],
	},
	{
		id: "portfolio-two",
		title: { en: "Second project", nl: "Tweede project" },
		description: {
			en: "A short description of the second project.",
			nl: "Een korte beschrijving van het tweede project.",
		},
		category: "motion",
		liveUrl: "https://example.com",
		media: [
			{
				type: "image",
				src: image,
				alt: { en: "Second project preview", nl: "Voorbeeld van het tweede project" },
			},
		],
	},
];

export const getProject = (id: string | undefined): Project | undefined =>
	projects.find((project) => project.id === id);
