import { useQuery } from "@tanstack/react-query";
import type CordsResponseType from "./cords.types";
import { cordsService } from "./cords.service";

export const UseGetCords = (location: string) => {
	return useQuery<CordsResponseType, Error>({
		queryKey: ["cords", location],
		queryFn: () => cordsService.getCords(location),
	});
};
