import type { FC } from "react";
import clsx from "clsx";
import styles from "./icon.module.scss";
import { iconSizes, type IconProps } from "./icon.props";

export const Icon: FC<IconProps> = ({ icon: IconComponent, size = iconSizes.md, className, ...props }) => {
	return <IconComponent size={size} strokeWidth={2} className={clsx(styles["icon"], className)} {...props} />;
};
