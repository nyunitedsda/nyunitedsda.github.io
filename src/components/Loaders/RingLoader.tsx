import Stack from "@mui/material/Stack";
import {
	alpha,
	type SxProps,
	type Theme,
	useTheme,
} from "@mui/material/styles";
import type { CSSProperties, FC } from "react";
import { default as Loader } from "react-spinners/RingLoader";
import type { RingLoaderProps } from "./types";

const override: CSSProperties = {
	display: "block",
	margin: "50% auto",
	height: "100%",
};

const rootSx: SxProps<Theme> = {
	height: "100%",
	width: "100%",
	justifyContent: "center",
	alignItems: "center",
	backgroundColor: "inherit",
};

const RingLoader: FC<RingLoaderProps> = (props) => {
	const theme = useTheme();

	return (
		<Stack sx={rootSx}>
			<Loader
				color={alpha(theme.palette.primary.main, 0.6)}
				cssOverride={override}
				aria-label="Loading Spinner"
				data-testid="loader"
				{...props}
			/>
		</Stack>
	);
};

export default RingLoader;
