import { useEffect, useState, type FC } from "react";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { localize } from "@/i18n/localize";
import type { DisplayNodeProps as DNP } from "./displayNode.props";
import styles from "./displayNode.module.scss";
import { Handler } from "@shared/Handler";

type MediaState = "loading" | "ready" | "error";

export const DisplayNode: FC<DNP> = ({ data }) => {
	const { t, i18n } = useTranslation();
	const [mediaState, setMediaState] = useState<MediaState>("loading");
	const label = data.labelKey ? t(data.labelKey) : data.label;
	const display = data.kind === "display" ? data : undefined;
	const project = display?.project;
	const mediaIndex = display?.mediaIndex ?? 0;
	const media = project?.media[mediaIndex];

	useEffect(() => {
		setMediaState("loading");
	}, [media?.src]);

	const mediaClassName = clsx(styles["display-node__media"], {
		[styles["display-node__media--loading"]]: mediaState === "loading",
		[styles["display-node__media--error"]]: mediaState === "error",
	});
	const mediaStyle = { filter: display?.filter };

	return (
		<div className={clsx(styles["display-node"])}>
			<Handler type="target" position="left" id="display-node" offsetTop={10} />

			{!project || display?.status === "empty" ? (
				<p className={styles["display-node__message"]}>{t("display.empty")}</p>
			) : display?.status === "error" || !media ? (
				<p className={styles["display-node__message"]}>{t("display.error")}</p>
			) : display?.variant === "text" ? (
				<div className={styles["display-node__text"]}>
					<strong>{localize(project.title, i18n.language)}</strong>
					<span>{t(`category.${project.category}`)}</span>
					<p>{localize(project.description, i18n.language)}</p>
				</div>
			) : (
				<div className={mediaClassName}>
					{mediaState === "loading" && <p className={styles["display-node__message"]}>{t("display.loading")}</p>}
					{mediaState === "error" && <p className={styles["display-node__message"]}>{t("display.error")}</p>}
					{media.type === "image" ? (
						<img
							src={media.src}
							alt={media.alt ? localize(media.alt, i18n.language) : (label ?? "")}
							style={mediaStyle}
							onLoad={() => setMediaState("ready")}
							onError={() => setMediaState("error")}
						/>
					) : (
						<video
							src={media.src}
							controls
							aria-label={label ?? ""}
							style={mediaStyle}
							onLoadedData={() => setMediaState("ready")}
							onError={() => setMediaState("error")}
						/>
					)}
				</div>
			)}

			<Handler type="source" position="right" id="display-node-1" offsetTop={90} />
			<Handler type="source" position="bottom" id="display-node-2" offsetLeft={90} />
		</div>
	);
};
