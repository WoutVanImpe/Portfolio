export default interface ProjectType {
	id: number;
	title: string;
	img: string;
	tags: string[];
	sections?: {
		intro: string;
		
	};
	extraImg?: string[];
}
