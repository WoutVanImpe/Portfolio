import type { ClassValue } from "clsx";
import type { LucideIcon, LucideProps } from "lucide-react";

export const iconSizes = {
	sm: 16,
	md: 24,
	lg: 32,
} as const;

export type IconSize = (typeof iconSizes)[keyof typeof iconSizes];

export interface IconProps extends Omit<LucideProps, "size" | "className"> {
	icon: LucideIcon;
	size?: IconSize | number;
	className?: ClassValue;
}
