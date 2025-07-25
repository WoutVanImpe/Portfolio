import { PageTitle } from "~shared/hooks/page-title/PageTitle";

export const NO_ROUTE = {
	path: "*",
	element: (
		<>
			<PageTitle title="page not found" />
			<h1>404: page not found</h1>
		</>
	),
};

export const PROJECT_ROUTE = {
	template: "work/",
	path: "work/:id",
	element: (
		<>
			<PageTitle title="Wout Van Impe | project" />
			<h1>project page</h1>
		</>
	),
};
