import { motion, useAnimation, useMotionValue, useMotionValueEvent, useTransform } from "motion/react";
import styles from "./contactSectionH.module.scss";
import { useTheme } from "~context/ThemeContext";
import { forwardRef, useEffect } from "react";
import { Trans } from "react-i18next";
import { Letter } from "~shared/components/letter/Letter";
import boxFrontImg from "../../assets/mailbox-front.svg";
import boxBackImg from "../../assets/mailbox-back.svg";
import boxDoorImg from "../../assets/mailbox-door.svg";
import useWindowDimensions from "~shared/hooks/screen-size/useWindowDimensions";
import { FadeInSlideUp } from "~shared/components/fadeIn/FadeIn";

export const ContactSectionH = forwardRef<HTMLDivElement, {}>((props, ref) => {
	const { textColor, textBgColor, textBorderColor } = useTheme();
	const { width } = useWindowDimensions();

	const letterControls = useAnimation();
	const doorControls = useAnimation();
	const moveXFactor = useMotionValue<number>(0.6);

	const letterReady = useMotionValue<number>(0);
	const doorOpen = useMotionValue<number>(0);

	const formScale = useMotionValue<number>(width > 1250 ? 1 : Math.max((width / 1000) * 0.8, 0.67));

	const baseLetterScale = useTransform(formScale, (s) => 1 / s);
	const letterAnimScale = useMotionValue(1);

	const letterScale = useMotionValue<number>(baseLetterScale.get() * letterAnimScale.get());

	useEffect(() => {
		const newScale = width > 1250 ? 1 : Math.max((width / 1000) * 0.8, 0.6);
		const newBaseLetterScale = 1 / newScale;

		formScale.set(newScale);
		letterScale.set(newBaseLetterScale * letterAnimScale.get());
	}, [width]);

	useMotionValueEvent(letterReady, "change", () => {
		if (width >= 900) {
			handleDoor();
		}
	});

	useMotionValueEvent(doorOpen, "change", () => {
		if (doorOpen.get() === 1) {
			insertLetter();
		}
	});

	const insertLetter = async () => {
		if (width < 1050) {
			if (width < 950) {
				moveXFactor.set(0.5);
			} else {
				moveXFactor.set(0.55);
			}
		} else {
			moveXFactor.set(0.6);
		}

		await letterControls.start({
			rotate: 0,
			x: width > 1280 ? 1280 * moveXFactor.get() : width * moveXFactor.get(),
			scale: 0.8,
			zIndex: 2,
			transition: { rotate: { duration: 0.2, ease: "easeInOut" }, scale: { duration: 0.5, ease: "easeInOut" }, x: { duration: 0.8, ease: "easeInOut" } },
		});
		letterAnimScale.set(0.8);
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
			<motion.div className={styles["s-contact__form"]} style={{ scale: formScale, transformOrigin: "bottom" }}>
				<FadeInSlideUp delay={0.1}>
					<motion.div animate={letterControls} className={styles["s-contact__form__letter"]} style={{ zIndex: 4, scale: letterScale, y: -50 }}>
						<Letter letterReady={letterReady} />
					</motion.div>
				</FadeInSlideUp>
				<motion.div className={styles["s-contact__form__mailbox-container"]} style={{ zIndex: 3, display: width >= 900 ? "block" : "none" }}>
					<div className={styles["s-contact__form__mailbox-container__mailbox"]}>
						<motion.img className={styles["s-contact__form__mailbox-container__mailbox__front"]} src={boxFrontImg} alt="mailbox" />
						<motion.img animate={doorControls} className={styles["s-contact__form__mailbox-container__mailbox__door"]} src={boxDoorImg} alt="mailbox" />
					</div>
				</motion.div>
				<motion.div className={styles["s-contact__form__mailbox-container"]} style={{ zIndex: 1, display: width >= 900 ? "block" : "none" }}>
					<div className={styles["s-contact__form__mailbox-container__mailbox"]}>
						<motion.img className={styles["s-contact__form__mailbox-container__mailbox__back"]} src={boxBackImg} alt="mailbox" />
					</div>
				</motion.div>
			</motion.div>
		</div>
	);
});
