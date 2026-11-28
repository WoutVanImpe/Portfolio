import { useEffect, useState } from "react";

export const SCREEN_BLOCK_QUERY =
	"(max-width: 599.98px), (max-height: 549.98px)";

export const useScreenBlock = (): boolean => {
	const [blocked, setBlocked] = useState(() => window.matchMedia(SCREEN_BLOCK_QUERY).matches);

	useEffect(() => {
		const query = window.matchMedia(SCREEN_BLOCK_QUERY);
		const update = (event: MediaQueryListEvent) => setBlocked(event.matches);

		setBlocked(query.matches);
		query.addEventListener("change", update);

		return () => query.removeEventListener("change", update);
	}, []);

	return blocked;
};
