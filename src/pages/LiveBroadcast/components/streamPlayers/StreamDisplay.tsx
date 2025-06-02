import Stack from "@mui/material/Stack";
import { type SxProps, type Theme } from "@mui/material/styles";
import type { FC } from "react";
import type { StreamDisplayProps } from "./types";

const rootSx: SxProps<Theme> = {};

const StreamDisplay: FC<StreamDisplayProps> = (props) => {
	const { loading = "lazy", stackProps, ...rest } = props;

	return (
		<Stack
			{...stackProps}
			sx={[
				rootSx,
				...(stackProps?.sx
					? Array.isArray(stackProps?.sx)
						? stackProps?.sx
						: [stackProps?.sx]
					: []
				),
			]}
		>
			<iframe
				allow="fullscreen"
				allowFullScreen
				height="100%"
				loading={loading}
				width="100%"
				{...rest}
			></iframe>
		</Stack>
	);
};

export default StreamDisplay;
