import styles from "./headerSection.module.scss";
import useWindowDimensions from "~shared/hooks/screen-size/useWindowDimensions";
import { motion, useMotionValue } from "motion/react";
import { forwardRef, useEffect } from "react";
import { WindowLamp } from "~shared/components/window-lamp/WindowLamp";
import { useTheme } from "~context/ThemeContext";
import { Trans } from "react-i18next";
import { FadeInZoom } from "~shared/components/fadeIn/FadeIn";

export const HeaderSectionH = forwardRef<HTMLDivElement, {}>((props, ref) => {
	const { width } = useWindowDimensions();
	const { textColor, textBgColor, textBorderColor } = useTheme();

	const getWindowScale = (width: number) => {
		if (width >= 1000) {
			return 1;
		}
		if (width >= 860) {
			return (width / 1000) * 0.9;
		}
		if (width >= 570) {
			return 1;
		}
		return (width / 570) * 0.9;
	};

	const windowScale = useMotionValue(getWindowScale(width));

	useEffect(() => {
		windowScale.set(getWindowScale(width));
	}, [width]);

	return (
		<motion.div className={styles["s-header"]} ref={ref}>
			<div className={styles["s-header__greet-container"]}>
				<motion.div className={styles["s-header__greet-container__text-container"]} style={{marginBottom: 25}}>
					<motion.div className={styles["s-header__greet-container__text-container__frame"]} animate={{ color: textColor, backgroundColor: textBgColor, borderColor: textBorderColor }} transition={{ duration: 1, ease: "easeIn" }}>
						<h1>
							<Trans>header.title</Trans>
						</h1>
						<h3>
							<Trans>header.subtitle</Trans>
						</h3>
					</motion.div>
					<motion.p animate={{ color: textColor }} transition={{ duration: 1, ease: "easeIn" }} style={{ display: width > 768 ? "block" : "none", marginBottom:0 }}>
						<Trans>tips.title</Trans>
					</motion.p>
				</motion.div>
			</div>
			<FadeInZoom delay={0.3}>
				<motion.div className={styles["s-header__window-container"]} style={{ scale: windowScale }}>
					<WindowLamp />
				</motion.div>
			</FadeInZoom>
		</motion.div>
	);
});
