import type { ButtonProps } from "@mui/material/Button";
import type { SxProps, Theme } from "@mui/material/styles";
import type { PropsWithChildren } from "react";
import type { RouteMenu } from "../../hooks/routes/types";

export type MenuButtonProps = PropsWithChildren<{
	path: string;
	isActive: (path: string) => boolean;
	buttonProps?: Omit<ButtonProps, "children">;
	menuItems?: RouteMenu[];
}>;

export type MenuButtonStyle = {
	activeBtnSx: SxProps<Theme>;
	buttonSx: SxProps<Theme>;
};

export type ConfirmationButtonProps = ButtonProps & {
	shouldConfirm?: boolean;
	confirmationTitle?: string;
	confirmationContent?: string;
	cancelLabel?: string;
	confirmLabel?: string;
	onClick?: () => void;
};
