import type { CardMetaProps, CardProps } from "antd";
import type { ReactNode } from "react";

export interface PCardProps extends Omit<CardProps, 'title'>{
	header: CardMetaProps;
}
