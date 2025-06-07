import Stack from "@mui/material/Stack";
import {
	type SxProps,
	type Theme,
	alpha,
	useTheme,
} from "@mui/material/styles";
import type { CSSProperties, FC } from "react";
import { default as Loader } from "react-spinners/RingLoader";
import type { RingLoaderProps } from "./types";

const override: CSSProperties = {
	display: "block",
	margin: "auto",
	height: "100%",
};

const rootSx: SxProps<Theme> = {
	height: "100%",
	width: "100%",
};

const RingLoader: FC<RingLoaderProps> = (props) => {
	const theme = useTheme();

	return (
		<Stack sx={rootSx}>
			<Loader
				color={alpha(theme.palette.primary.main, 0.6)}
				cssOverride={override}
				// size={150}
				aria-label="Loading Spinner"
				data-testid="loader"
				{...props}
			/>
		</Stack>
	);
};

export default RingLoader;
