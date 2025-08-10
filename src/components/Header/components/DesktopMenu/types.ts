import type { Theme } from "@emotion/react";
import type { RouteMenu } from "@hooks/routes";
import type { SxProps } from "@mui/material";

interface DesktopMenuProps {
	menuList: RouteMenu[];
	sx?: SxProps<Theme>;
	isActive: (path: string) => boolean;
}

export type { DesktopMenuProps };
