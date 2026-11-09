import type { CardProps } from "antd";
import type { PropsWithChildren } from "react";

interface MinistryCardProps extends Omit<CardProps, "content" | "actions"> {
	content: string;
	link?: string;
	image?: {
		src?: string;
		alt?: string;
	};
}

type SectionWrapperProps = PropsWithChildren<{
	header?: string;
	spacing?: number;
}>;

export type { MinistryCardProps, SectionWrapperProps };
