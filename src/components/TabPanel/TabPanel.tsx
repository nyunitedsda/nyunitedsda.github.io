import Stack from "@mui/material/Stack";
import type { SxProps, Theme } from "@mui/material/styles";
import type { FC } from "react";
import RingLoader from "../Loaders/RingLoader";
import type { TabPanelProps } from "./types";

const rootSx: SxProps<Theme> = {
	flexGrow: 1,
	width: "100%",
	color: "text.primary",
};

const TabPanel: FC<TabPanelProps> = (props) => {
	const { children, index, sx, value, ...other } = props;

	return (
		<>
			{(!value || !index) && <RingLoader />}
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
