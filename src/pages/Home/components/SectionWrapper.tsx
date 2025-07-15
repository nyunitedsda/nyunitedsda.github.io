import Stack from "@mui/material/Stack";
import type { SxProps, Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { type FC, memo } from "react";
import type { SectionWrapperProps } from "./types";

const headerSx: SxProps<Theme> = {
	fontWeight: "bold",
	color: "primary.light",
	textAlign: "center",
	width: "100%",
	fontFamily: "inter",
};

const SectionWrapper: FC<SectionWrapperProps> = ({
	children,
	header,
	spacing = 3,
}) => {
	return (
		<Stack spacing={spacing}>
			{header && (
				<Typography variant="h4" component="h2" sx={headerSx}>
					{header}
				</Typography>
			)}

			{children}
		</Stack>
	);
};

export default memo(SectionWrapper);
