import Stack from "@mui/material/Stack";
import { type FC } from "react";
import type { StreamDisplayProps } from "./types";

const StreamDisplay: FC<StreamDisplayProps> = (props) => {
	const { loading = "lazy", stackProps, id, ...rest } = props;

	return (
		<Stack
			id={"wrap"}
			sx={{
				flexGrow: 1,
				minHeight: "-webkit-fill-available",
				height: "auto",
				position: "relative",
				"& html": {
					backgroundColor: "red !important",
					// added style for the child element tag body
					margin: 0,
					padding: 0,
					tag123: "testing",
				},
				"& iframe": {
					position: "absolute",
					border: 0,
					height: "auto",

					minHeight: "-webkit-fill-available",
				},
			}}
		>
			<iframe
				seamless
				allow="fullscreen"
				allowFullScreen
				// height="100%"
				id={id}
				width="100%"
				{...rest}
			></iframe>
		</Stack>
	);
};

export default StreamDisplay;
