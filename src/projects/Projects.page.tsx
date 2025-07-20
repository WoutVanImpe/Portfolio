import { forwardRef } from "react";
import styles from "./projects.module.scss";

export const Projects = forwardRef<HTMLDivElement, {}>((props, ref) => {
	return (
		<div ref={ref}>
			<h1>Projects</h1>
		</div>
	);
});
