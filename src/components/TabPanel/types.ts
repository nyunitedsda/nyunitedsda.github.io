import type { StackProps } from "@mui/material";
import type { PropsWithChildren, ReactNode } from "react";

type TabPanelProps = PropsWithChildren<{
	children?: ReactNode;
	dir?: string;
	index: number;
	value: number;
	enableStack?: boolean;
	stackProps?: StackProps;
}>;

export type { TabPanelProps };
