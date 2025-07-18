import { useEffect } from "react";
import { useLocation } from "react-router";

interface PageTitleProps {
	title: string;
}

export const PageTitle: React.FC<PageTitleProps> = ({ title }) => {
	const location = useLocation();

	useEffect(() => {
		document.title = title;
	}, [location, title]);

	return null;
};
