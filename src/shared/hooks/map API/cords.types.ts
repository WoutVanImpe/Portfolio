export default interface CordsResponseType {
	features: {
		properties: {
			lon: number;
			lat: number;
			formatted: string;
		};
	}[];
}
