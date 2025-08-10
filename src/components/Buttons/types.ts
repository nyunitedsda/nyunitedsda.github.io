import type { RouteMenu } from "@hooks/routes";
import type { ButtonProps } from "@mui/material/Button";
import type { IconButtonProps } from "@mui/material/IconButton";
import type { SxProps, Theme } from "@mui/material/styles";
import type { PropsWithChildren, ReactNode } from "react";

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

export type ConfirmationButtonProps = (
	| ({ confirmVariant?: "button" } & ButtonProps)
	| ({ confirmVariant: "icon" } & IconButtonProps)
) & {
	shouldConfirm?: boolean;
	confirmationTitle?: string;
	confirmationContent?: ReactNode;
	cancelLabel?: string;
	confirmLabel?: string;
	onClick?: () => void;
};
