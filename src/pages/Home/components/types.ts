import type { PropsWithChildren } from "react";
import type { ImageProps } from "../../../components/Image/types";
import type { CardProps } from "../../../components/ProjectCard/types";

export interface MinistryCardProps
	extends Omit<CardProps, "content" | "actions"> {
	content: string;
	link?: string;
	image?: ImageProps;
}

export type SectionWrapperProps = PropsWithChildren<{
	header?: string;
	spacing?: number;
}>;
