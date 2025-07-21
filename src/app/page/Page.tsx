import styles from "../App/app.module.scss";
import { Home } from "~home/Home.page";
import { About } from "~about/About.page";
import { Projects } from "~projects/Projects.page";
import { Contact } from "~contact/Contact.page";
import { useEffect, useRef, useState } from "react";
import { NavBar } from "~shared/components/navigation/NavBar";
import { motion, useInView } from "motion/react";
import { useGetProjects } from "~shared/hooks/projects-data/useGetProjects.hooks";
import useWindowDimensions from "~shared/hooks/screen-size/useWindowDimensions";
import type ProjectType from "~shared/hooks/projects-data/project.types";


export const Page = () => {
	const { data } = useGetProjects();
	const projectList: ProjectType[] = [];
	const dimensions = useWindowDimensions();

	if (data) {
		while (projectList.length <= (dimensions.width / 253) * 2) data.forEach((project) => projectList.push(project));
	}

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
		<motion.div className={styles["page"]}>
			<NavBar home={homeRef} about={aboutRef} works={worksRef} contact={contactRef} whiteNavColor={whiteNavColor} navIndex={navIndex} />
			<Home projects={projectList} ref={homeRef} />
			<About ref={aboutRef} />
			<div style={{ height: "500px" }}></div>
			<Projects projects={projectList} ref={worksRef} />
			<div style={{ height: "500px" }}></div>
			<Contact ref={contactRef} />
			<div style={{ height: "500px" }}></div>
		</motion.div>
	);
};

export default Page;
