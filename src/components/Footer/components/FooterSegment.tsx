import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import type { SxProps, Theme } from "@mui/material/styles";
import { type FC, memo } from "react";
import type { FooterSegmentProps } from "./types";

const contentSx: SxProps<Theme> = {
	color: "inherit",
	display: "flex",
	flexDirection: "column",
	fontSize: (theme) => `${theme.typography.body2.fontSize} !important`,
	gap: 1,
};

const responsiveGridSize = { xs: 12, sm: 6, md: 3 };

const FooterSegment: FC<FooterSegmentProps> = ({
	children,
	subtitle,
	sx,
	title,
}) => (
	<Grid size={responsiveGridSize} sx={sx}>
		<Typography variant="h6" fontWeight="bold" mb={2} fontFamily="inter">
			{title}
		</Typography>
		{subtitle && (
			<Typography variant="body2" mb={2}>
				{subtitle}
			</Typography>
		)}
		<Box sx={contentSx}>{children}</Box>
	</Grid>
);

export default memo(FooterSegment);
