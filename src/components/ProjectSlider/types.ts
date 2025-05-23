import type { SxProps, Theme } from "@mui/material/styles";
import type { PropsWithChildren } from "react";
import type { Settings } from "react-slick";

type ProjectSliderProps = PropsWithChildren<{
	sx?: SxProps<Theme>;
	settings?: Settings;
}>;

export type { ProjectSliderProps };
