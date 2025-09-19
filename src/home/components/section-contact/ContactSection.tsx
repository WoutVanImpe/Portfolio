import { motion, useAnimation, useMotionValue, useMotionValueEvent } from "motion/react";
import styles from "./contactSection.module.scss";
import { useTheme } from "~context/ThemeContext";
import { forwardRef } from "react";
import { Trans } from "react-i18next";
import { Letter } from "~shared/components/letter/Letter";
import { Mailbox } from "~shared/components/mailbox/Mailbox";

export const ContactSection = forwardRef<HTMLDivElement, {}>((props, ref) => {
	const { textColor, textBgColor, textBorderColor } = useTheme();

	const letterControls = useAnimation();

	const letterReady = useMotionValue<number>(0);
	const doorOpen = useMotionValue<number>(0);

	useMotionValueEvent(doorOpen, "change", () => {
		if (doorOpen.get() === 1) {
			insertLetter();
		}
	});

	const insertLetter = async () => {
		await letterControls.start({
			rotate: 0,
			x: 700,
			y: -50,
			scale: 0.8,
			transition: { rotate: { duration: 0.2, ease: "easeInOut" }, y: { duration: 0.8, ease: "easeInOut" }, scale: { duration: 0.5, ease: "easeInOut" }, x: { duration: 0.8, ease: "easeInOut" } },
		});

		letterReady.set(0);
	};

	return (
		<div className={styles["s-contact"]} ref={ref}>
			<motion.h1 animate={{ color: textColor, backgroundColor: textBgColor, borderColor: textBorderColor }} transition={{ duration: 1, ease: "easeIn" }}>
				<Trans>contact.title</Trans>
			</motion.h1>
			<div className={styles["s-contact__form"]}>
				<motion.div animate={letterControls} className={styles["s-contact__form__letter"]}>
					<Letter letterReady={letterReady} />
				</motion.div>
				<div className={styles["s-contact__form__mailbox"]}>
					<Mailbox letterReady={letterReady} doorOpen={doorOpen} />
				</div>
			</div>
		</div>
	);
});
