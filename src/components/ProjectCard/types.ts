import type { CardMetaProps, CardProps } from "antd";

export interface PCardProps extends Omit<CardProps, 'title'>{
	header: CardMetaProps;
}
