import type { ReactNode } from "react";

interface PageTitleProps {
	handleClick?: () => void;
	icon?: ReactNode;
	subtitle?: string;
	title: string;
}

export type { PageTitleProps };
