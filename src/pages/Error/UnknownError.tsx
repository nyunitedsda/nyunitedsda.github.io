import { AppProvider } from "@/components";
import { routePaths } from "@hooks/routes";
import { ArrowBackIosNew } from "@mui/icons-material";
import ErrorOutlineOutlined from "@mui/icons-material/ErrorOutlineOutlined";
import HomeRounded from "@mui/icons-material/HomeRounded";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import type { SxProps, Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import type { ReactNode } from "react";
import { type FC, useCallback } from "react";
import { useNavigate } from "react-router";

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
	color: theme => theme.palette.error.main,
	mb: 2,
};

const rootSx: SxProps<Theme> = {
	backgroundColor: theme => theme.palette.background.default,
	textAlign: "center",
	width: "100%",
	alignItems: "center",
	justifyContent: "center",
	height: "100vh",
	gap: 3,
	"& .MuiTypography-root": {
		color: theme => theme.palette.text.primary,
	},
};

const apologySx: SxProps<Theme> = {
	color: theme => theme.palette.text.secondary,
};

const HOME = "Home";
const ERROR_MSG = "Something Went Wrong";
const APOLOGY_MSG = "We apologize for the inconvenience";
const PRAY_MSG: ReactNode = (
	<>
		"The LORD is my strength and my shield; my heart trusts in him, and he helps
		me." - <i>Psalm 28:7</i>
	</>
);
const BACKWARDS = "Go back";

const UnknownError: FC = () => {
	const navigate = useNavigate();

	const handleSelection = useCallback((path: number | string) => {
		if (typeof path === 'number') {
			navigate(path);
		} else {
			navigate(path, { replace: true })
		}
	}, [navigate]);

	return (
		<AppProvider>
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

				<Typography component={"blockquote"} variant="h5">
					{PRAY_MSG}
				</Typography>

				<Box sx={actionSx}>
					<Button
						color="primary"
						onClick={() => handleSelection(-1)}
						size="large"
						startIcon={<ArrowBackIosNew />}
						title={BACKWARDS}
						variant="outlined"
					>
						{BACKWARDS}
					</Button>

					<Button
						autoFocus
						color="primary"
						onClick={() => handleSelection(routePaths.HOME)}
						size="large"
						startIcon={<HomeRounded />}
						variant="contained"
					>
						{`Return to ${HOME}`}
					</Button>
				</Box>
			</Stack>
		</AppProvider>
	);
};

export default UnknownError;
