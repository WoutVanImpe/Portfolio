export default interface ProjectType {
	id: number;
	title: string;
	img: string;
	tags: string[];
	description?: {
		intro: string;
		sections: string[]
	};
	extraImg?: string[];
}
