import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import styles from "./app.module.scss";
import { Home } from "~home/Home.page";
import { About } from "~about/About.page";
import { Projects } from "~projects/Projects.page";
import { Contact } from "~contact/Contact.page";
import { useRef } from "react";
import { NavBar } from "~shared/components/navigation/NavBar";

const queryClient = new QueryClient();

export const App = () => {
	const homeRef = useRef<HTMLDivElement | null>(null);
	const aboutRef = useRef<HTMLDivElement | null>(null);
	const worksRef = useRef<HTMLDivElement | null>(null);
	const contactRef = useRef<HTMLDivElement | null>(null);

	return (
		<QueryClientProvider client={queryClient}>
			<div className={styles["app"]}>
				<NavBar home={homeRef} about={aboutRef} works={worksRef} contact={contactRef} />
				<Home ref={homeRef} />
				<About ref={aboutRef} />
				<Projects ref={worksRef} />
				<Contact ref={contactRef} />
			</div>
		</QueryClientProvider>
	);
};

export default App;
