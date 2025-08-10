import type { StackProps } from "@mui/material/Stack";
import type { IframeHTMLAttributes } from "react";

export interface StreamDisplayProps
	extends IframeHTMLAttributes<{ [key: string]: unknown }> {
	id: string;
	stackProps?: StackProps;
}
