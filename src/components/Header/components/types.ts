import type { SxProps, Theme } from "@mui/material/styles";

export interface SidebarProps {
	open: boolean;
	isActive: (path: string) => boolean;
	onClose: () => void;
}

export type BrandingStyle = {
	brandingSx: SxProps<Theme>;
	rootSx: SxProps<Theme>;
	logoSx: SxProps<Theme>;
};

export type HeaderStyle = {
	hamburgerMenuSx: SxProps<Theme>;
	rootSx: SxProps<Theme>;
	desktopMenuSx: SxProps<Theme>;
	desktopDisplaySx: SxProps<Theme>;
};
