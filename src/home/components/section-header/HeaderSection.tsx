import styles from "./headerSection.module.scss";
import useWindowDimensions from "~shared/hooks/screen-size/useWindowDimensions";
import { motion, useMotionValue } from "motion/react";
import { forwardRef, useEffect } from "react";
import { WindowLamp } from "~shared/components/window-lamp/WindowLamp";
import { useTheme } from "~context/ThemeContext";
import { Trans } from "react-i18next";

export const HeaderSection = forwardRef<HTMLDivElement, {}>((props, ref) => {
	const { width } = useWindowDimensions();
	const windowScale = useMotionValue<number>(width > 1200 ? (1200 * 0.3) / 500 : (width * 0.3) / 500);

	const { textColor, textBgColor, textBorderColor } = useTheme();

	useEffect(() => {
		windowScale.set(width > 1200 ? (1200 * 0.3) / 400 : (width * 0.3) / 400);
	}, [width]);

	return (
		<div className={styles["s-header"]} ref={ref}>
			<div className={styles["s-header__greet-container"]}>
				<motion.div className={styles["s-header__greet-container__frame"]} animate={{ color: textColor, backgroundColor: textBgColor, borderColor: textBorderColor }} transition={{ duration: 1, ease: "easeIn" }}>
					<h1>
						<Trans>header.title</Trans>
					</h1>
					<h3>
						<Trans>header.subtitle</Trans>
					</h3>
					<motion.p animate={{ color: textColor }} transition={{ duration: 1, ease: "easeIn" }}>
						<Trans>tips.title</Trans>
					</motion.p>
				</motion.div>
			</div>
			<div className={styles["s-header__window-container"]}>
				<motion.div className={styles["s-header__window-container__window"]} style={{ scale: windowScale }}>
					<WindowLamp />
				</motion.div>
			</div>
		</div>
	);
});
