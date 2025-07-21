import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import styles from "./app.module.scss";
import { Home } from "~home/Home.page";
import { About } from "~about/About.page";
import { Projects } from "~projects/Projects.page";
import { Contact } from "~contact/Contact.page";
import { useEffect, useRef, useState } from "react";
import { NavBar } from "~shared/components/navigation/NavBar";
import { motion, useInView } from "motion/react";

const queryClient = new QueryClient();

export const App = () => {
	const homeRef = useRef<HTMLDivElement | null>(null);
	const aboutRef = useRef<HTMLDivElement | null>(null);
	const worksRef = useRef<HTMLDivElement | null>(null);
	const contactRef = useRef<HTMLDivElement | null>(null);

	const [whiteNavColor, setWhiteNavColor] = useState(true);
	const [navIndex, setNavIndex] = useState(true);

	const isHomeInView = useInView(homeRef, { amount: 0.1 });
	const isHomeInViewForIndex = useInView(homeRef, { amount: 0.3 });

	useEffect(() => {
		setWhiteNavColor(isHomeInView);
	}, [isHomeInView]);

	useEffect(() => {
		setNavIndex(isHomeInViewForIndex);
	}, [isHomeInViewForIndex]);

	return (
		<QueryClientProvider client={queryClient}>
			<motion.div className={styles["app"]}>
				<NavBar home={homeRef} about={aboutRef} works={worksRef} contact={contactRef} whiteNavColor={whiteNavColor} navIndex={navIndex} />
				<Home ref={homeRef} />
				<About ref={aboutRef} />
				<div style={{ height: "500px" }}></div>
				<Projects ref={worksRef} />
				<div style={{ height: "500px" }}></div>
				<Contact ref={contactRef} />
				<div style={{ height: "500px" }}></div>
			</motion.div>
		</QueryClientProvider>
	);
};

export default App;
