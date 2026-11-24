import { useEffect, useState, type FC } from "react";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { localize } from "@/i18n/localize";
import type { DisplayView } from "../node.types";
import type { DisplayNodeProps as DNP } from "./displayNode.props";
import styles from "./displayNode.module.scss";
import { Handler } from "@shared/Handler";

type MediaState = "loading" | "ready" | "error";

export const DisplayNode: FC<DNP> = ({ id, data }) => {
	const { t, i18n } = useTranslation();
	const [mediaState, setMediaState] = useState<MediaState>("loading");
	const mediaTargetId = `${id}-media-target`;
	const mediaSourceOneId = `${id}-source-1-source`;
	const mediaSourceTwoId = `${id}-source-2-source`;
	const mediaViewId = `${id}-view-media`;
	const infoViewId = `${id}-view-info`;
	const viewRadioName = `${id}-display-view`;
	const label = data.labelKey ? t(data.labelKey) : data.label;
	const display = data.kind === "display" ? data : undefined;
	const project = display?.project;
	const mediaIndex = display?.mediaIndex ?? 0;
	const media = project?.media[mediaIndex];
	const view: DisplayView = display?.view ?? "info";
	const connectedHandles = data.connectedHandles ?? [];
	const isConnected = data.isConnected ?? false;
	const status = display?.status ?? "empty";
	const ledStatus = mediaState === "error" ? "error" : status;

	useEffect(() => {
		setMediaState("loading");
	}, [media?.src]);

	const mediaClassName = clsx(styles["display-node__media"], {
		[styles["display-node__media--loading"]]: mediaState === "loading",
		[styles["display-node__media--error"]]: mediaState === "error",
	});
	const handleViewChange = (next: DisplayView) => () => display?.onViewChange?.(next);

	return (
		<div className={clsx(styles["display-node"])} data-view={view}>
			<span className={styles["display-node__code"]}>DSP-01</span>

			<div className={styles["display-node__header"]}>
				<span
					className={styles["display-node__status"]}
					data-active={isConnected ? "true" : undefined}
					data-status={ledStatus}
					aria-hidden="true"
				/>
				<span className={styles["display-node__title"]}>{label}</span>
			</div>

			<div className={styles["display-node__body"]}>
				<div className={styles["display-node__title-strip"]}>
					<span className={styles["display-node__strip-title"]}>
						{project ? localize(project.title, i18n.language) : t("display.empty")}
					</span>
					{project && <span className={styles["display-node__strip-category"]}>{t(`category.${project.category}`)}</span>}
				</div>

				<div className={styles["display-node__screen"]}>
					<div className={styles["display-node__screen-content"]} style={{ filter: display?.filter }}>
						{!project || status === "empty" ? (
							<p className={styles["display-node__message"]}>{t("display.empty")}</p>
						) : view === "info" ? (
							<div className={styles["display-node__text"]}>
								<p>{localize(project.description, i18n.language)}</p>
							</div>
						) : status === "error" || !media ? (
							<p className={styles["display-node__message"]}>{t("display.error")}</p>
						) : (
							<div className={styles["display-node__stage"]}>
								<div className={mediaClassName}>
									{mediaState === "loading" && <p className={styles["display-node__message"]}>{t("display.loading")}</p>}
									{mediaState === "error" && <p className={styles["display-node__message"]}>{t("display.error")}</p>}
									{media.type === "image" ? (
										<img
											src={media.src}
											alt={media.alt ? localize(media.alt, i18n.language) : (label ?? "")}
											onLoad={() => setMediaState("ready")}
											onError={() => setMediaState("error")}
										/>
									) : (
										<video
											src={media.src}
											controls
											aria-label={label ?? ""}
											onLoadedData={() => setMediaState("ready")}
											onError={() => setMediaState("error")}
										/>
									)}
								</div>
							</div>
						)}
					</div>
				</div>
			</div>

			<div className={styles["display-node__jack-strip"]}>
				<Handler
					type="target"
					position="left"
					id={`${id}-media`}
					portLabel="MEDIA"
					connected={connectedHandles.includes(mediaTargetId)}
					handleColors={data.handleColors}
				/>
				<Handler
					type="source"
					position="right"
					id={`${id}-source-1`}
					portLabel="OUT"
					connected={connectedHandles.includes(mediaSourceOneId)}
					handleColors={data.handleColors}
				/>
				<Handler
					type="source"
					position="bottom"
					id={`${id}-source-2`}
					portLabel="OUT"
					connected={connectedHandles.includes(mediaSourceTwoId)}
					handleColors={data.handleColors}
				/>

				<div className={styles["display-node__controls"]}>
					<span className={styles["display-node__rotary-tag"]} aria-hidden="true">
						{t("display.info")}
					</span>

					<div className={styles["display-node__rotary"]} role="radiogroup" aria-label={t("display.view")}>
						<input
							className={styles["display-node__radio"]}
							type="radio"
							id={mediaViewId}
							name={viewRadioName}
							checked={view === "media"}
							onChange={handleViewChange("media")}
						/>
						<label
							className={clsx(styles["display-node__rotary-label"], styles["display-node__rotary-label--media"])}
							htmlFor={mediaViewId}
							aria-label={t("display.media")}
						/>

						<input
							className={styles["display-node__radio"]}
							type="radio"
							id={infoViewId}
							name={viewRadioName}
							checked={view === "info"}
							onChange={handleViewChange("info")}
						/>
						<label
							className={clsx(styles["display-node__rotary-label"], styles["display-node__rotary-label--info"])}
							htmlFor={infoViewId}
							aria-label={t("display.info")}
						/>

						<div className={styles["display-node__dial"]} aria-hidden="true" />
						<div className={styles["display-node__notches"]} aria-hidden="true">
							<div className={styles["display-node__notch"]} data-notch="media" />
							<div className={styles["display-node__notch"]} data-notch="info" />
						</div>
					</div>

					<span className={styles["display-node__rotary-tag"]} aria-hidden="true">
						{t("display.media")}
					</span>
				</div>
			</div>
		</div>
	);
};
