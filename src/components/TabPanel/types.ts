import type { StackProps } from "@mui/material";

interface TabPanelProps extends StackProps {
	dir?: string;
	index: number;
	value: number;
}

export type { TabPanelProps };
