import styles from "./home.module.scss";
import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { NavBar } from "~home/components/navigation/NavBar";
import type ProjectType from "~shared/hooks/projects-data/project.types";
import useWindowDimensions from "~shared/hooks/screen-size/useWindowDimensions";
import { Header } from "./components/header-section/Header";
import { About } from "./components/about-section/About";
import { Projects } from "./components/projects-section/Projects";
import { Contact } from "./components/contact-section/Contact";
import { useProjects } from "~context/ProjectContext";

export const HomePage = () => {
	const { projects } = useProjects();
	const styleProjectList: ProjectType[] = [];
	const realProjectList: ProjectType[] = [];
	const dimensions = useWindowDimensions();

	if (projects) {
		while (styleProjectList.length <= (dimensions.width / 253) * 2) projects.forEach((project) => styleProjectList.push(project));
		projects.forEach((project) => realProjectList.push(project));
	}

	const homeRef = useRef<HTMLDivElement | null>(null);
	const aboutRef = useRef<HTMLDivElement | null>(null);
	const worksRef = useRef<HTMLDivElement | null>(null);
	const contactRef = useRef<HTMLDivElement | null>(null);

	const [whiteNavColor, setWhiteNavColor] = useState(true);
	const [navIndex, setNavIndex] = useState<2 | 30>(2);

	const isHomeInView = useInView(homeRef, { amount: 0.1 });
	const isHomeInViewForIndex = useInView(homeRef, { amount: 0.3 });

	useEffect(() => {
		setWhiteNavColor(isHomeInView);
	}, [isHomeInView]);

	useEffect(() => {
		setNavIndex(isHomeInViewForIndex ? 2 : 30);
	}, [isHomeInViewForIndex]);

	return (
		<motion.div className={styles["page"]}>
			<NavBar home={homeRef} about={aboutRef} works={worksRef} contact={contactRef} whiteNavColor={whiteNavColor} navIndex={navIndex} />
			<Header projects={styleProjectList} ref={homeRef} />
			<About ref={aboutRef} />
			{projects && projects.length > 0 && <Projects projects={realProjectList} ref={worksRef} />}
			<Contact ref={contactRef} />
			<div style={{ height: "500px" }}></div>
		</motion.div>
	);
};
