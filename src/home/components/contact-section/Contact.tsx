import { forwardRef } from "react";
import styles from "./contact.module.scss";

export const Contact = forwardRef<HTMLDivElement, {}>((props, ref) => {
	return (
		<div ref={ref}>
			<h1>Contact</h1>
		</div>
	);
});
