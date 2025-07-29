import type { SxProps } from "@mui/material";
import type { RouteMenu } from "../../../../hooks/routes/types";
import type { Theme } from "@emotion/react";

interface DesktopMenuProps {
	menuList: RouteMenu[];
	sx?: SxProps<Theme>;
	isActive: (path: string) => boolean;
}

export type { DesktopMenuProps };
