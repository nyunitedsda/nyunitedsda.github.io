import Stack from "@mui/material/Stack";
import type { SxProps, Theme } from "@mui/material/styles";
import type { FC } from "react";
import type { StreamDisplayProps } from "./types";

const rootSx: SxProps<Theme> = {
	flexGrow: 1,
	height: "auto",
	minHeight: "-webkit-fill-available",
	position: "relative",
	"& html": {
		backgroundColor: "red !important",
		margin: 0,
		padding: 0,
	},
	"& iframe": {
		border: 0,
		height: "auto",
		minHeight: "-webkit-fill-available",
		position: "absolute",
	},

	"& .responsive-iframe": {
		position: "relative",
		pb: "56.25%",
		/*aspect ratio 16:9 */
		height: 0,
		overflow: "hidden",
	},
	".responsive-iframe iframe": {
		width: "100%",
		height: "100%",
		position: "absolute",
		left: 0,
		top: 0,
	},
};

const StreamDisplay: FC<StreamDisplayProps> = (props) => {
	const { loading = "lazy", stackProps, id, ...rest } = props;

	return (
		<Stack id={"wrap"} sx={rootSx} className=".responsive-iframe">
			<iframe
				seamless
				allow="fullscreen"
				allowFullScreen
				className=".responsive-iframe iframe"
				id={id}
				width="100%"
				{...rest}
			></iframe>
		</Stack>
	);
};

export default StreamDisplay;
