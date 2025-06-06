import { alpha, useTheme } from "@mui/material/styles";
import type { CSSProperties, FC } from "react";
import { default as Loader } from "react-spinners/RingLoader";
import type { RingLoaderProps } from "./types";

const override: CSSProperties = {
	display: "block",
	margin: "auto",
};

const RingLoader: FC<RingLoaderProps> = (props) => {
	const theme = useTheme();

	return (
		<Loader
			color={alpha(theme.palette.primary.main, 0.6)}
			cssOverride={override}
			size={150}
			aria-label="Loading Spinner"
			data-testid="loader"
			{...props}
		/>
	);
};

export default RingLoader;
