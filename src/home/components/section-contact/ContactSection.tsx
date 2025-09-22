import { motion, useAnimation, useMotionValue, useMotionValueEvent } from "motion/react";
import styles from "./contactSection.module.scss";
import { useTheme } from "~context/ThemeContext";
import { forwardRef } from "react";
import { Trans } from "react-i18next";
import { Letter } from "~shared/components/letter/Letter";
import boxFrontImg from "../../assets/mailbox-front.svg";
import boxBackImg from "../../assets/mailbox-back.svg";
import boxDoorImg from "../../assets/mailbox-door.svg";

export const ContactSection = forwardRef<HTMLDivElement, {}>((props, ref) => {
	const { textColor, textBgColor, textBorderColor } = useTheme();

	const letterControls = useAnimation();
	const doorControls = useAnimation();

	const letterReady = useMotionValue<number>(0);
	const doorOpen = useMotionValue<number>(0);

	useMotionValueEvent(letterReady, "change", () => handleDoor());

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

	const handleDoor = async () => {
		await doorControls.start({
			rotateY: 150 * letterReady.get(),
			transition: { duration: 0.8, ease: "easeInOut" },
		});
		doorOpen.set(1);
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
				<div className={styles["s-contact__form__mailbox-container"]}>
					<div className={styles["s-contact__form__mailbox-container__mailbox"]}>
						<motion.img className={styles["s-contact__form__mailbox-container__mailbox__front"]} src={boxFrontImg} alt="mailbox" />
						<motion.img className={styles["s-contact__form__mailbox-container__mailbox__back"]} src={boxBackImg} alt="mailbox" />
						<motion.img animate={doorControls} className={styles["s-contact__form__mailbox-container__mailbox__door"]} src={boxDoorImg} alt="mailbox" />
					</div>
				</div>
			</div>
		</div>
	);
});
