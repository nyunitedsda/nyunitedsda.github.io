import type { StackProps } from "@mui/material/Stack";
import type { IframeHTMLAttributes } from "react";

export interface StreamDisplayProps extends IframeHTMLAttributes<{}> {
	stackProps?: StackProps;
}
