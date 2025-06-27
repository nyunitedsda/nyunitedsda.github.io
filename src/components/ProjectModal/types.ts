import type { SxProps, Theme } from "@mui/material";
import type { PropsWithChildren } from "react";

type ProjectModalProps = PropsWithChildren<{
	ariaText?: string;
	open: boolean;
	sx?: SxProps<Theme>;
	zeroPadding?: boolean;
	onClose: () => void;
}>;

export type { ProjectModalProps };
