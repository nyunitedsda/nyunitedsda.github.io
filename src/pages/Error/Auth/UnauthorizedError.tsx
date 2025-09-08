"use client";

import { routePaths } from "@hooks/routes";
import LockOutlined from "@mui/icons-material/LockOutlined";
import Box from "@mui/material/Box";
import Button, { type ButtonProps } from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import type { SxProps, Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { type FC, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { PERMISSION_ERROR } from "../constants";
import { AppProvider } from "@/components";

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
	color: "warning.main",
	mb: 2,
};

const rootSx: SxProps<Theme> = {
	textAlign: "center",
	width: "100%",
	alignItems: "center",
	justifyContent: "center",
	flexGrow: 1,
	gap: 3,
	"& .MuiTypography-root": {
		color: "text.primary",
	},
};

const apologySx: SxProps<Theme> = {
	color: "text.secondary",
};

const { ERROR_MSG, APOLOGY_MSG, DESCRIPTION_MSG, BUTTONS } = PERMISSION_ERROR;

const UnauthorizedError: FC = () => {
	const navigate = useNavigate();

	const refreshPage = useCallback(() => {
		window.location.reload();
	}, []);

	const redirectUser = useCallback(
		(path: "home" | "login") => {
			if (path === "home") {
				navigate(routePaths.HOME, { replace: true });
			} else if (path === "login") {
				navigate(routePaths.LOGIN, { replace: true });
			}
		},
		[navigate],
	);

	return (
		<AppProvider>
			<Stack spacing={3} sx={rootSx} className="fade-in">
				<Stack alignItems={"center"} spacing={2}>
					<LockOutlined sx={errorIconSx} />
					<Typography variant="h2" component="h1" fontWeight={"bold"}>
						{ERROR_MSG}
					</Typography>
				</Stack>

				<Stack spacing={2} alignItems="center">
					<Typography variant="h5" sx={apologySx}>
						{APOLOGY_MSG}
					</Typography>

					<Typography variant="body1" color="text.secondary" maxWidth={600}>
						{DESCRIPTION_MSG}
					</Typography>
				</Stack>

				<Box sx={actionSx}>
					{BUTTONS.map(({ action, color, icon, label, variant, to }) => (
						<Button
							color={(color ?? "primary") as ButtonProps["color"]}
							onClick={() => {
								if (action === "refresh") refreshPage();
								else if (action === "redirect")
									redirectUser(to as "home" | "login");
							}}
							key={label}
							startIcon={icon}
							variant={(variant ?? "outlined") as ButtonProps["variant"]}
						>
							{label}
						</Button>
					))}
				</Box>
			</Stack>
		</AppProvider>
	);
};

export default UnauthorizedError;
