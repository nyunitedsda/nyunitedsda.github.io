import type { SxProps, Theme } from "@mui/material/styles";
import type { PropsWithChildren } from "react";

export type FooterSegmentProps = PropsWithChildren<{
	title: string;
	subtitle?: string;
	sx?: SxProps<Theme>;
	isLoading?: boolean;
}>;
