"use client";

import LockOutlined from "@mui/icons-material/LockOutlined";
import Box from "@mui/material/Box";
import Button, { type ButtonProps } from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { SxProps, Theme } from "@mui/material/styles";
import { type FC, useCallback } from "react";
import { useNavigate } from "react-router";
import {
	ERROR_MSG,
	APOLOGY_MSG,
	DESCRIPTION_MSG,
	ERROR_BUTTONS,
} from "./constants";

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
	height: "100vh",
	gap: 3,
	"& .MuiTypography-root": {
		color: "text.primary",
	},
};

const apologySx: SxProps<Theme> = {
	color: "text.secondary",
};

const UnauthorizedError: FC = () => {
	const navigate = useNavigate();

	const refreshPage = useCallback(() => {
		window.location.reload();
	}, []);

	const redirectUser = useCallback((path: "home" | "login") => {
		if (path === "home") {
			navigate("/", { replace: true });
		} else if (path === "login") {
			navigate("/login", { replace: true });
		}
	}, []);

	return (
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
				{ERROR_BUTTONS.map(({ action, color, icon, label, variant }) => (
					<Button
						color={(color ?? "primary") as ButtonProps["color"]}
						onClick={() => {
							if (action === "refresh") refreshPage();
							else if (action === "redirect")
								redirectUser(label.toLowerCase() as "home" | "login");
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
	);
};

export default UnauthorizedError;
