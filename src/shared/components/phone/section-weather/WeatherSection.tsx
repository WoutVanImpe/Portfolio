import { useRef, useState, type Dispatch, type SetStateAction } from "react";
import styles from "./weatherSection.module.scss";
import { motion } from "motion/react";
import { useTheme } from "~context/ThemeContext";
import { UseGetWeather } from "~shared/hooks/weather API/useGetWeather.hooks";
import { Trans, useTranslation } from "react-i18next";
import { t } from "i18next";

export const WeatherSection = ({ setAppState }: { setAppState: Dispatch<SetStateAction<"home" | "draw" | "todo" | "weather" | "map">> }) => {
	const [location, setLocation] = useState<string>("brussel");
	const { i18n } = useTranslation();

	const { data, isLoading } = UseGetWeather(location, i18n.language);

	const { textColor, textBgColor, darkmode } = useTheme();

	const textInputRef = useRef<HTMLInputElement | null>(null);

	const handleTyping = () => {
		setLocation(textInputRef.current!.value);
	};

	return (
		<div className={styles["weather"]}>
			<div className={styles["weather__search"]}>
				<motion.input
					name="location"
					type="text"
					placeholder={t("phone.weather.brussels")}
					ref={textInputRef}
					onChange={handleTyping}
					animate={{ color: textColor, backgroundColor: textBgColor, borderColor: darkmode ? "rgba(250, 250, 250, 0.384)" : "rgba(0, 0, 0, 0.384)" }}
					transition={{ duration: 1, ease: "easeIn" }}
				/>
			</div>
			<div className={styles["weather__data"]}>
				<img src={data?.current.condition.icon} alt="" />
				<h2>{data?.location.name}</h2>
				<p>{data?.location.localtime}</p>
				<div>
					{isLoading && (
						<motion.p animate={{ color: textColor }} transition={{ duration: 1, ease: "easeIn" }}>
							<Trans>phone.weather.loading</Trans>...
						</motion.p>
					)}
					{data && (
						<div className={styles["weather__data__container"]}>
							<motion.p animate={{ color: textColor }} transition={{ duration: 1, ease: "easeIn" }}>
								{data?.current.condition.text}
							</motion.p>
							<motion.p animate={{ color: textColor }} transition={{ duration: 1, ease: "easeIn" }}>
								<Trans>phone.weather.temperature</Trans>: {data?.current.temp_c}°C
							</motion.p>
							<motion.p animate={{ color: textColor }} transition={{ duration: 1, ease: "easeIn" }}>
								<Trans>phone.weather.precipitation</Trans>: {data?.current.precip_mm} mm
							</motion.p>
							<motion.p animate={{ color: textColor }} transition={{ duration: 1, ease: "easeIn" }}>
								<Trans>phone.weather.windSpeed</Trans>: {data?.current.wind_kph} <Trans>phone.weather.kph</Trans>
							</motion.p>
						</div>
					)}
				</div>
			</div>
			<motion.svg onClick={() => setAppState("home")} animate={{ fill: textColor }} transition={{ fill: { duration: 1, ease: "easeIn" } }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
				<path d="M341.8 72.6C329.5 61.2 310.5 61.2 298.3 72.6L74.3 280.6C64.7 289.6 61.5 303.5 66.3 315.7C71.1 327.9 82.8 336 96 336L112 336L112 512C112 547.3 140.7 576 176 576L464 576C499.3 576 528 547.3 528 512L528 336L544 336C557.2 336 569 327.9 573.8 315.7C578.6 303.5 575.4 289.5 565.8 280.6L341.8 72.6zM304 384L336 384C362.5 384 384 405.5 384 432L384 528L256 528L256 432C256 405.5 277.5 384 304 384z" />
			</motion.svg>
		</div>
	);
};
