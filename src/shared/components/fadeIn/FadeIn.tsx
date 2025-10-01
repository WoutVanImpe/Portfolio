import { motion } from "motion/react";
import type { ReactElement } from "react";

export const FadeInZoom = ({ children, delay }: { children: ReactElement; delay: number }) => {
	return (
		<motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.7, ease: "easeOut", delay }} variants={{ visible: { opacity: 1, scale: 1 }, hidden: { opacity: 0, scale: 0.5 } }}>
			{children}
		</motion.div>
	);
};

export const FadeInSlideUp = ({ children, delay }: { children: ReactElement; delay: number }) => {
	return (
		<motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.7, ease: "easeOut", delay }} variants={{ visible: { opacity: 1, y: 0 }, hidden: { opacity: 0, y: 100 } }}>
			{children}
		</motion.div>
	);
};
