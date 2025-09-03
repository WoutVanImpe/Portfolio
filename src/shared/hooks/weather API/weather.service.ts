import { WEATHER_APIKEY } from "./ApiKey";
import type WeatherResponseType from "./weather.types";

const API_KEY = WEATHER_APIKEY;

class WeatherService {
	async getWeather(location: string, lang: string): Promise<WeatherResponseType> {
		const loc = location === "" ? "brussel" : location;
		const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${loc}&aqi=no&lang=${lang}`);

		if (!response.ok) {
			throw new Error("Error fetching API weather data");
		}

		const data = await response.json();
		return data as WeatherResponseType;
	}
}
export const weatherService = new WeatherService();
