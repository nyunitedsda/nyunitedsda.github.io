import type { CardProps } from "@components/ProjectCard";
import type { PropsWithChildren } from "react";

export interface MinistryCardProps
	extends Omit<CardProps, "content" | "actions"> {
	content: string;
	link?: string;
	image?: {
		src?: string;
		alt?: string;
	};
}

export type SectionWrapperProps = PropsWithChildren<{
	header?: string;
	spacing?: number;
}>;
