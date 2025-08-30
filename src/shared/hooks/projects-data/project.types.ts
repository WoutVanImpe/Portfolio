export default interface ProjectType {
	id: number;
	cover: string;
	tags: ["motion" | "graphic desing" | "web" | "social media"];
	en: {
		title: string;
		teaser: string;
	};
	nl: {
		title: string;
		teaser: string;
	};
}
