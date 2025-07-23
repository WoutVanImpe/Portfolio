import { forwardRef } from "react";
import styles from "./about.module.scss";

export const About = forwardRef<HTMLDivElement, {}>((props, ref) => {
	return (
		<div ref={ref}>
			<h1>About</h1>
		</div>
	);
});
