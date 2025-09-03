import { CORDS_APIKEY } from "./ApiKey";
import type CordsResponseType from "./cords.types";

const API_KEY = CORDS_APIKEY;

class CordsService {
	async getCords(location: string): Promise<CordsResponseType> {
		const loc = location === "" ? "brussel" : location;
		const formattedLoc = encodeURIComponent(loc);
		const response = await fetch(`https://api.geoapify.com/v1/geocode/search?text=${formattedLoc}&apiKey=${API_KEY}`);

		if (!response.ok) {
			throw new Error("Error fetching API Cords data");
		}

		const data = await response.json();
		return data as CordsResponseType;
	}
}
export const cordsService = new CordsService();
