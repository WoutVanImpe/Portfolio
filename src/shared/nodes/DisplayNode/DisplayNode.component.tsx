import { useEffect, useRef, useState, type CSSProperties, type FC } from "react";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { localize } from "@/i18n/localize";
import { getYouTubeEmbedUrl, getYouTubeThumbnailUrl, type ProjectMedia } from "@shared/data/projects";
import { toCssFilter } from "../graph";
import { getHardwareCode } from "../initialNodes";
import type { DisplayView } from "../node.types";
import { MEDIA_FADE_MS } from "../timing";
import type { DisplayNodeProps as DNP } from "./displayNode.props";
import styles from "./displayNode.module.scss";
import { Handler } from "@shared/Handler";

type MediaState = "loading" | "ready" | "error";

export const DisplayNode: FC<DNP> = ({ id, data }) => {
	const { t, i18n } = useTranslation();
	const [mediaState, setMediaState] = useState<MediaState>("loading");
	const [renderedMedia, setRenderedMedia] = useState<ProjectMedia | undefined>(() => data.kind === "display" ? data.project?.media[data.mediaIndex ?? 0] : undefined);
	const [mediaFading, setMediaFading] = useState(false);
	const hasMediaMountedRef = useRef(false);
	const [renderedView, setRenderedView] = useState<DisplayView>(() => (data.kind === "display" ? data.view ?? "media" : "media"));
	const [viewFading, setViewFading] = useState(false);
	const hasViewMountedRef = useRef(false);
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
	const youtubeEmbedUrl = renderedMedia?.type === "youtube" ? getYouTubeEmbedUrl(renderedMedia.src) : null;
	const youtubePosterUrl = renderedMedia?.type === "youtube" ? getYouTubeThumbnailUrl(renderedMedia.src) : null;
	const youtubeUnavailable = renderedMedia?.type === "youtube" && !youtubeEmbedUrl;
	const view: DisplayView = display?.view ?? "media";
	const connectedHandles = data.connectedHandles ?? [];
	const isConnected = data.isConnected ?? false;
	const status = display?.status ?? "empty";
	const hasMediaError = mediaState === "error" || youtubeUnavailable;
	const ledStatus = hasMediaError ? "error" : status;
	const usesYouTubeFrame = renderedMedia?.type === "youtube" && Boolean(youtubeEmbedUrl) && !youtubeUnavailable;
	const appliedFilter = usesYouTubeFrame
		? toCssFilter((display?.modifiers ?? []).filter((modifier) => modifier !== "rgbSplit" && modifier !== "pixelate"))
		: display?.filter;

	useEffect(() => {
		if (!hasMediaMountedRef.current) {
			hasMediaMountedRef.current = true;
			setRenderedMedia(media);
			return;
		}

		if (renderedMedia?.src === media?.src && renderedMedia?.type === media?.type) return;

		setMediaFading(true);
		const timer = window.setTimeout(() => {
			setRenderedMedia(media);
			setMediaState("loading");
		}, MEDIA_FADE_MS);

		return () => window.clearTimeout(timer);
	}, [media, renderedMedia]);

	useEffect(() => {
		if (!hasViewMountedRef.current) {
			hasViewMountedRef.current = true;
			setRenderedView(view);
			return;
		}

		if (renderedView === view) return;

		setViewFading(true);
		const timer = window.setTimeout(() => {
			setRenderedView(view);
			setViewFading(false);
		}, MEDIA_FADE_MS);

		return () => window.clearTimeout(timer);
	}, [renderedView, view]);

	const revealMedia = () => {
		setMediaState("ready");
		setMediaFading(false);
	};
	const failMedia = () => {
		setMediaState("error");
		setMediaFading(false);
	};

	const mediaClassName = clsx(styles["display-node__media"], {
		[styles["display-node__media--loading"]]: mediaState === "loading",
		[styles["display-node__media--error"]]: hasMediaError,
		[styles["display-node__media--fading"]]: mediaFading,
	});
	const youtubeEffectClassName = clsx({
		[styles["display-node__youtube--rgb-split"]]: usesYouTubeFrame && display?.modifiers?.includes("rgbSplit"),
		[styles["display-node__youtube--pixelate"]]: usesYouTubeFrame && display?.modifiers?.includes("pixelate"),
	});
	const screenContentClassName = clsx(styles["display-node__screen-content"], {
		[styles["display-node__screen-content--info"]]: renderedView === "info",
		[styles["display-node__screen-content--view-fading"]]: viewFading,
		[styles["display-node__screen-content--vhs"]]: display?.modifiers?.includes("vhs"),
	});
	const handleViewChange = (next: DisplayView) => () => display?.onViewChange?.(next);

	return (
		<div className={clsx(styles["display-node"])} data-view={view}>
			<span className={styles["display-node__code"]}>{getHardwareCode(id)}</span>

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
					{project && <span className={styles["display-node__strip-category"]}>{project.categories.map((category) => t(`category.${category}`)).join(" / ")}</span>}
				</div>

				<div className={styles["display-node__screen"]}>
					<div
						className={screenContentClassName}
						style={{ filter: appliedFilter }}
					>
						{!project || status === "empty" ? (
							<p className={styles["display-node__message"]}>{t("display.empty")}</p>
						) : renderedView === "info" ? (
							<div className={styles["display-node__text"]}>
								<p>{localize(project.description, i18n.language)}</p>
							</div>
						) : status === "error" || !renderedMedia || youtubeUnavailable ? (
							<p className={styles["display-node__message"]}>{t("display.error")}</p>
						) : renderedMedia.type === "youtube" && youtubeEmbedUrl ? (
							<div
								className={clsx(styles["display-node__youtube"], mediaClassName, youtubeEffectClassName)}
								data-loading={mediaState === "loading" ? "true" : undefined}
								style={{ "--youtube-poster": youtubePosterUrl ? `url("${youtubePosterUrl}")` : undefined } as CSSProperties}
							>
								{mediaState === "loading" && <p className={styles["display-node__message"]}>{t("display.loading")}</p>}
								{mediaState === "error" && <p className={styles["display-node__message"]}>{t("display.error")}</p>}
								<iframe
									src={youtubeEmbedUrl}
									title={renderedMedia.alt ? localize(renderedMedia.alt, i18n.language) : (label ?? t("display.media"))}
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
									allowFullScreen
									loading="lazy"
									referrerPolicy="strict-origin-when-cross-origin"
									onLoad={revealMedia}
									onError={failMedia}
								/>
							</div>
						) : (
							<div className={styles["display-node__stage"]}>
								<div className={mediaClassName}>
									{mediaState === "loading" && <p className={styles["display-node__message"]}>{t("display.loading")}</p>}
									{mediaState === "error" && <p className={styles["display-node__message"]}>{t("display.error")}</p>}
									{renderedMedia.type === "image" ? (
										<img
											src={renderedMedia.src}
											alt={renderedMedia.alt ? localize(renderedMedia.alt, i18n.language) : (label ?? "")}
											onLoad={revealMedia}
											onError={failMedia}
										/>
									) : (
										<video
											src={renderedMedia.src}
											controls
											aria-label={label ?? ""}
											onLoadedData={revealMedia}
											onError={failMedia}
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
					position="bottom"
					id={`${id}-media`}
					portLabel="MEDIA"
					connected={connectedHandles.includes(mediaTargetId)}
					handleColors={data.handleColors}
				/>
				<Handler
					type="source"
					position="bottom"
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
						{t("display.media")}
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
						{t("display.info")}
					</span>
				</div>
			</div>
		</div>
	);
};
