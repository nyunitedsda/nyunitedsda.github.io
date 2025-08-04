import { ArrowForwardIosRounded } from "@mui/icons-material";
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Stack,
} from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import type { SxProps, Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import type { FC } from "react";
import FooterSegmentSkeleton from "./FooterSegmentSkeleton";
import type { FooterSegmentProps } from "./types";

const contentSx: SxProps<Theme> = {
	color: "inherit",
	display: "flex",
	flexDirection: "column",
	fontSize: (theme) => `${theme.typography.body2.fontSize} !important`,
	gap: 1,
};

const accordionSx: SxProps<Theme> = {
	backgroundColor: "inherit !important",
	"& .MuiAccordionDetails-root": {
		pl: (theme) => `${theme.spacing(7.5)} !important`,
		py: (theme) => `${theme.spacing(0)} !important`,
	},
};

const summarySx: SxProps<Theme> = {
	flexDirection: "row-reverse !important",
	alignItems: "center",
	gap: 2,
	"& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
		transform: "rotate(90deg)",
	},
	"& .MuiAccordionSummary-content": {
		m: 0,
	},
};

const responsiveGridSize = { xs: 12, sm: 6, md: 3 };

const ComponentContent: FC<Omit<FooterSegmentProps, "isLoading">> = ({
	title,
	subtitle,
	children,
}) => {
	const isMobile = useMediaQuery((theme: Theme) =>
		theme.breakpoints.down("md"),
	);

	return (
		<>
			{isMobile ? (
				<Accordion
					sx={accordionSx}
					disableGutters
					elevation={0}
					slotProps={{ transition: { unmountOnExit: true } }}
				>
					<AccordionSummary
						expandIcon={<ArrowForwardIosRounded sx={{ fontSize: "1rem" }} />}
						sx={summarySx}
					>
						<Stack>
							<Typography variant="h6" fontWeight="bold" fontFamily="inter">
								{title}
							</Typography>
							{subtitle && (
								<Typography variant="body2" mb={2}>
									{subtitle}
								</Typography>
							)}
						</Stack>
					</AccordionSummary>
					<AccordionDetails>
						<Box sx={contentSx}>{children}</Box>
					</AccordionDetails>
				</Accordion>
			) : (
				<>
					<Typography variant="h6" fontWeight="bold" mb={2} fontFamily="inter">
						{title}
					</Typography>
					{subtitle && (
						<Typography variant="body2" mb={2}>
							{subtitle}
						</Typography>
					)}
					<Box sx={contentSx}>{children}</Box>
				</>
			)}
		</>
	);
};

const FooterSegment: FC<FooterSegmentProps> = ({
	children,
	subtitle,
	sx,
	title,
	isLoading = false,
}) => (
	<Grid size={responsiveGridSize} sx={sx}>
		{isLoading ? (
			<FooterSegmentSkeleton />
		) : (
			<ComponentContent {...{ title, subtitle, children }} />
		)}
	</Grid>
);

export default FooterSegment;
