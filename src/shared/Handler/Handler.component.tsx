import type { CSSProperties, FC } from "react";
import { Handle } from "@xyflow/react";
import clsx from "clsx";
import { POS_RECORD, type HandlerProps as HP } from "./handler.props";
import styles from "./handler.module.scss";

export const Handler: FC<HP> = ({
	type,
	id,
	position,
	handleId,
	offsetTop,
	offsetLeft,
	connected,
	portLabel,
}) => {
	const style: CSSProperties = {};

	if (offsetTop !== undefined) style.top = `${offsetTop}%`;
	if (offsetLeft !== undefined) style.left = `${offsetLeft}%`;

	return (
		<Handle
			className={clsx(styles["handler"])}
			type={type}
			position={POS_RECORD[position]}
			id={handleId ?? `${id}-${type}`}
			style={style}
			data-connected={connected ? "true" : undefined}
			data-port-label={portLabel}
			data-handle-position={position}
		/>
	);
};
