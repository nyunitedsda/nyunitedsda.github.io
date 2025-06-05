import { alpha, useTheme } from "@mui/material/styles";
import {
	type CSSProperties,
	type FC,
	Suspense,
	type SuspenseProps,
} from "react";
import RingLoader from "react-spinners/RingLoader";

const override: CSSProperties = {
	display: "block",
	margin: "auto",
	// borderColor: "red",
};

const ProjectSuspense: FC<Omit<SuspenseProps, "fallback">> = ({
	children,
	...rest
}) => {
	const theme = useTheme();

	return (
		<Suspense
			fallback={
				<RingLoader
					color={alpha(theme.palette.primary.main, 0.6)}
					cssOverride={override}
					size={150}
					aria-label="Loading Spinner"
					data-testid="loader"
				/>
			}
			{...rest}
		>
			{children}
		</Suspense>
	);
};

export default ProjectSuspense;
