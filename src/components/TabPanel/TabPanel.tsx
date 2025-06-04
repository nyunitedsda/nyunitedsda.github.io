import Stack from "@mui/material/Stack";
import { type FC, memo } from "react";
import type { TabPanelProps } from "./types";

const TabPanel: FC<TabPanelProps> = (props) => {
	const { children, index, value, ...other } = props;

	return (
		<Stack
			role="tabpanel"
			hidden={value !== index}
			id={`full-width-tabpanel-${index}`}
			aria-labelledby={`full-width-tab-${index}`}
			{...other}
		>
			{value === index && (children)}
		</Stack>
	);
};

export default memo(TabPanel);
