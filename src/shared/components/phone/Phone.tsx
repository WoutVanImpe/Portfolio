import styles from "./phone.module.scss";
import phoneImg from "../assets/phone.svg";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useTheme } from "~context/ThemeContext";
import { useEffect } from "react";
import { useTips } from "~context/TipsContext";
import { Trans } from "react-i18next";
import { Screen } from "./Screen";

export const Phone = () => {
	const { textColor } = useTheme();
	const { tips } = useTips();
	const tipOpac = useMotionValue(0);

	useEffect(() => {
		tips ? tipOpac.set(1) : tipOpac.set(0);
	}, [tips]);

	const smoothTip = useSpring(tipOpac, {
		stiffness: 80,
		damping: 20,
		mass: 1,
	});

	const tipOpacity = useTransform(smoothTip, [0, 1], [0, 1]);

	const phoneState = useMotionValue<number>(0);

	const handlePower = () => {
		phoneState.get() === 1 ? phoneState.set(0) : phoneState.set(1);
	};

	return (
		<div className={styles["phone-container"]}>
			<img src={phoneImg} alt="phone" className={styles["phone-container__phone"]} />
			<motion.div className={styles["phone-container__button"]} onClick={handlePower} whileHover={{ boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2) inset, 0 6px 20px 0 rgba(0, 0, 0, 0.19) inset" }}></motion.div>{" "}
			<motion.p animate={{ color: textColor }} style={{ opacity: tipOpacity }} transition={{ duration: 1, ease: "easeIn" }}>
				<Trans>tips.phone</Trans>
			</motion.p>
			<motion.div className={styles["phone-container__screen-container"]}>
				<Screen screenState={phoneState} />
			</motion.div>
		</div>
	);
};
