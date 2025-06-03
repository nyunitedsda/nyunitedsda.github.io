import type { SxProps, Theme } from "@mui/material/styles";

export const activeMenuSx: SxProps<Theme> = {
	"& .MuiTypography-root": {},
	fontWeight: "bold",
	color: "primary.contrastText",
	backgroundColor: "primary.light",
	"& svg": {
		color: "primary.contrastText",
	},
};


export const menuDefaultSx: SxProps<Theme> = {
  borderRadius: 0.5,
  color: "text.secondary",
  backgroundColor: "transparent",
  "&:hover": {
    backgroundColor: "action.hover",
    // 	color: "primary.contrastText",
    // backgroundColor: "primary.light",
  },
  '& svg': {
    color: "text.secondary",
  },
}