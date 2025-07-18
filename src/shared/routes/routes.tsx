import { PageTitle } from "~shared/components/page-title/PageTitle";
import { Projects } from "~projects/Projects.page";
import { Home } from "~home/Home.page";
import { Contact } from "~contact/Contact.page";

export const HOME_ROUTE = {
	path: "/",
	element: (
		<>
			<PageTitle title="Home" />
			<Home />
		</>
	),
};

export const CONTACT_ROUTE = {
	path: "/contact",
	element: (
		<>
			<PageTitle title="contact" />
			<Contact />
		</>
	),
};

export const PROJECTS_ROUTE = {
	path: "/projects",
	element: (
		<>
			<PageTitle title="Projects" />
			<Projects />
		</>
	),
};