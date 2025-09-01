import { OpenInNew } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import type { SxProps, Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { CONTACT_CONSTANT } from "@pages/Contact";
import type { FC } from "react";

const rootSx: SxProps<Theme> = {
	p: 2,
	minHeight: "450px",
	overflow: "hidden",
	display: "flex",
	flexDirection: "column",
	gap: 2,
	mt: 2,
};

const directionSx: SxProps<Theme> = {
	p: 2,
	height: { xs: "auto", md: "100%" },
	gap: 2,
	width: { xs: "100%", md: "50%" },
	"& svg": {
		fontSize: (theme) => theme.spacing(2.2),
		fill: (theme) => theme.palette.primary.light,
	},
};

const plannerSx: SxProps<Theme> = {
	textDecoration: "none",
	color: (theme) => `${theme.palette.primary.light} !important`,
};
const mapSx: SxProps<Theme> = { width: "100%" };

const styleSx = { borderRadius: 4, width: "100%" };

const { TRIP_PLANNER, MAP_URL, TRANSIT_URL } = CONTACT_CONSTANT;

const MapDirection: FC = () => {
	return (
		<Paper elevation={3} sx={rootSx}>
			<Stack direction="row" sx={directionSx}>
				<Typography
					variant="h6"
					component={"a"}
					sx={plannerSx}
					title={"Open link to MTA "}
					href={TRANSIT_URL}
				>
					{TRIP_PLANNER}
					<OpenInNew color="primary" />
				</Typography>
			</Stack>
			<Box sx={mapSx}>
				<iframe
					src={MAP_URL}
					height="450"
					style={styleSx}
					allowFullScreen
					referrerPolicy="no-referrer-when-downgrade"
					title="Google Maps Location"
				></iframe>
			</Box>
		</Paper>
	);
};

export default MapDirection;
