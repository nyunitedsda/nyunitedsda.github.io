import ErrorOutlineOutlined from "@mui/icons-material/ErrorOutlineOutlined";
import HomeRounded from "@mui/icons-material/HomeRounded";
import RefreshOutlined from "@mui/icons-material/RefreshOutlined";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import type { SxProps, Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { type FC, useCallback, useMemo } from "react";
import useFormattedRoutes from "../../hooks/routes/useFormattedRoutes";

const actionSx: SxProps<Theme> = {
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	gap: 3,
	flexWrap: "wrap",
	p: 2,
	width: "100%",
};

const errorIconSx: SxProps<Theme> = {
	fontSize: 80,
	color: "error.main",
	mb: 2,
};

const rootSx: SxProps<Theme> = {
	textAlign: "center",
	width: "100%",
	alignItems: "center",
	justifyContent: "center",
	height: "100%",
	gap: 3,
	"& .MuiTypography-root": {
		color: "text.primary",
	},
};

const apologySx: SxProps<Theme> = {
	color: "text.secondary",
};

const HOME = "Home";
const ERROR_MSG = "Something Went Wrong";
const APOLOGY_MSG = "We apologize for the inconvenience";
const PRAY_MSG =
	'"The LORD is my strength and my shield; my heart trusts in him, and he helps me." - <i>Psalm 28:7</i>';
const REFRESH = "Refresh Page";

const Error: FC = () => {
	const { menuItems } = useFormattedRoutes();

	const homeRoute = useMemo(() => {
		return menuItems.filter((i) => i.name === HOME)[0];
	}, [menuItems]);

	const refreshPage = useCallback(() => {
		window.location.reload();
	}, []);

	return (
		<Stack spacing={3} sx={rootSx} className="fade-in">
			<Stack alignItems={"center"} spacing={2}>
				<ErrorOutlineOutlined sx={errorIconSx} />
				<Typography variant="h2" component="h1" fontWeight={"bold"}>
					{ERROR_MSG}
				</Typography>
			</Stack>

			<Typography variant="h5" sx={apologySx}>
				{APOLOGY_MSG}
			</Typography>

			<Typography
				component={"blockquote"}
				variant="body1"
				dangerouslySetInnerHTML={{ __html: PRAY_MSG }}
			/>

			<Box sx={actionSx}>
				<Button
					color="secondary"
					onClick={refreshPage}
					size="large"
					startIcon={<RefreshOutlined />}
					variant="outlined"
				>
					{REFRESH}
				</Button>

				<Button
					autoFocus
					color="primary"
					component={"a"}
					href={homeRoute.path}
					size="large"
					startIcon={<HomeRounded />}
					variant="contained"
				>
					{`Return to ${homeRoute.name}`}
				</Button>
			</Box>
		</Stack>
	);
};

export default Error;
