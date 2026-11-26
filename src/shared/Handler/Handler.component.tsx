import type { CSSProperties, FC } from "react";
import { Handle } from "@xyflow/react";
import clsx from "clsx";
import { POS_RECORD, type HandlerProps as HP } from "./handler.props";
import styles from "./handler.module.scss";

export const Handler: FC<HP> = ({ type, id, position, handleId, connected, portLabel, handleColors }) => {
	const resolvedHandleId = handleId ?? `${id}-${type}`;
	const fill = handleColors?.[resolvedHandleId];
	const handleStyle = fill ? ({ "--jack-fill": fill } as CSSProperties) : undefined;

	return (
		<div className={styles["jack-unit"]} data-kind={type}>
			<Handle
				className={clsx(styles["handler"])}
				type={type}
				position={POS_RECORD[position]}
				id={resolvedHandleId}
				style={handleStyle}
				data-connected={connected ? "true" : undefined}
			/>

			<span className={clsx(styles["port-label"], type === "source" && styles["port-label--out"])}>
				{portLabel}
			</span>
		</div>
	);
};
