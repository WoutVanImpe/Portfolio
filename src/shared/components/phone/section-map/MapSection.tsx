import { useRef, useState, type Dispatch, type SetStateAction } from "react";
import styles from "./mapSection.module.scss";
import { motion } from "motion/react";
import { useTheme } from "~context/ThemeContext";
import { Trans } from "react-i18next";
import { t } from "i18next";
import { UseGetCords } from "~shared/hooks/map API/useGetCords.hooks";
import { MapComponent } from "./MapComponent";

export const MapSection = ({ setAppState }: { setAppState: Dispatch<SetStateAction<"home" | "draw" | "todo" | "weather" | "map">> }) => {
	const { textColor, textBgColor, darkmode } = useTheme();

	const [input, setInput] = useState<string>("brussel");
	const [location, setLocation] = useState<string>("brussel");
	const textInputRef = useRef<HTMLInputElement | null>(null);

	const { data, isLoading } = UseGetCords(location);

	const handleTyping = () => {
		setInput(textInputRef.current!.value);
	};

	const handleSearch = () => {
		setLocation(input);
	};

	return (
		<div className={styles["map"]}>
			<div className={styles["map__search"]}>
				<motion.input
					type="text"
					placeholder={t("phone.weather.brussels")}
					ref={textInputRef}
					onChange={handleTyping}
					animate={{ color: textColor, backgroundColor: textBgColor, borderColor: darkmode ? "rgba(250, 250, 250, 0.384)" : "rgba(0, 0, 0, 0.384)" }}
					transition={{ duration: 1, ease: "easeIn" }}
				/>
				<motion.button onClick={handleSearch} animate={{ color: textColor, backgroundColor: textBgColor, borderColor: darkmode ? "rgba(250, 250, 250, 0.384)" : "rgba(0, 0, 0, 0.384)" }} transition={{ duration: 1, ease: "easeIn" }}>
					<Trans>phone.map.search</Trans>
				</motion.button>
			</div>
			{isLoading && (
				<motion.p animate={{ color: textColor }} transition={{ duration: 1, ease: "easeIn" }}>
					<Trans>phone.map.loading</Trans>...
				</motion.p>
			)}
			{data?.features.length === 0 && (
				<motion.p animate={{ color: textColor }} transition={{ duration: 1, ease: "easeIn" }}>
					<Trans>phone.map.notFound</Trans>
				</motion.p>
			)}
			{(data?.features?.length ?? 0) > 0 && <MapComponent lat={data!.features[0].properties.lat} lon={data!.features[0].properties.lon} formatted={data!.features[0].properties.formatted} />}

			<motion.svg onClick={() => setAppState("home")} animate={{ fill: textColor }} transition={{ fill: { duration: 1, ease: "easeIn" } }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
				<path d="M341.8 72.6C329.5 61.2 310.5 61.2 298.3 72.6L74.3 280.6C64.7 289.6 61.5 303.5 66.3 315.7C71.1 327.9 82.8 336 96 336L112 336L112 512C112 547.3 140.7 576 176 576L464 576C499.3 576 528 547.3 528 512L528 336L544 336C557.2 336 569 327.9 573.8 315.7C578.6 303.5 575.4 289.5 565.8 280.6L341.8 72.6zM304 384L336 384C362.5 384 384 405.5 384 432L384 528L256 528L256 432C256 405.5 277.5 384 304 384z" />
			</motion.svg>
		</div>
	);
};
