import Stack from "@mui/material/Stack";
import type { SxProps, Theme } from "@mui/material/styles";
import { type FC } from "react";
import type { TabPanelProps } from "./types";

const rootSx: SxProps<Theme> = {
	border: "1px solid red",
	height: "100%",
	width: "100%",
};

const TabPanel: FC<TabPanelProps> = (props) => {
	const { children, index, sx, value, ...other } = props;

	return (
		<>
			{value === index && (
				<Stack
					{...other}
					aria-labelledby={`full-width-tab-${index}`}
					hidden={value !== index}
					id={`full-width-tabpanel-${index}`}
					sx={[rootSx, ...(sx ? (Array.isArray(sx) ? sx : [sx]) : [])]}
					role="tabpanel"
				>
					{children}
				</Stack>
			)}
		</>
	);
};

export default TabPanel;
