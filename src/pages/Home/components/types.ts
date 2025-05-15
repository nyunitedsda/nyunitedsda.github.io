import type { ImageProps } from "../../../components/Image/types";
import type { CardProps } from "../../../components/ProjectCard/ProjectCard";

export interface MinistryCardProps extends Omit<CardProps, 'content' | 'actions'> {
content: string;
link?: string;
image?: ImageProps;
}