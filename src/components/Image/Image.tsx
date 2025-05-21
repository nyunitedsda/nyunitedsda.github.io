import { Box } from "@mui/material";
import { type FC } from "react";
import type { ImageProps } from "./types";

const Image: FC<ImageProps> = ({ root, image }) => {
	return (
		<Box {...root}>
			<img
				{...image}
				style={{ objectFit: "scale-down", maxWidth: "100%", height: "auto" }}
			/>
		</Box>
	);
};

export default Image;
