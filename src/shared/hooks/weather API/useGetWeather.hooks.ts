import { useQuery } from "@tanstack/react-query";
import type WeatherResponseType from "./weather.types";
import { weatherService } from "./weather.service";

export const UseGetWeather = (location: string, lang: string) => {
	return useQuery<WeatherResponseType, Error>({
		queryKey: ["weather", location, lang],
		queryFn: () => weatherService.getWeather(location, lang),
	});
};
