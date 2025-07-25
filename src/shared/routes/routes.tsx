import { HomePage } from "~home/Home.page";
import { PageTitle } from "~shared/hooks/page-title/PageTitle";

export const NO_ROUTE = {
	path: "*",
	element: (
		<>
			<PageTitle title="Wout Van Impe | page not found" />
			<h1>404: page not found</h1>
		</>
	),
};

export const PROJECT_ROUTE = {
	template: "work/",
	path: "work/:id",
	element: (
		<>
			<PageTitle title="Wout Van Impe | work" />
			<h1>project page</h1>
		</>
	),
};

export const HOME_ROUTE = {
	path: "/",
	element: (
		<>
			<PageTitle title="Wout Van Impe | home" />
			<HomePage />
		</>
	),
};
