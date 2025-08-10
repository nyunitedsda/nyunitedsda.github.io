import { LoginForm } from "@forms/collection";
import { useAuthentication } from "@hooks/auth";
import { routePaths } from "@hooks/routes";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import type { SxProps, Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import type { FC } from "react";
import { Navigate } from "react-router-dom";

const containerSx: SxProps<Theme> = {
	borderRadius: 2,
	p: 4,
	display: "flex",
	flexDirection: "column",
	gap: 2,
};

const headerSx: SxProps<Theme> = {
	position: "relative",
	textAlign: "center",
	color: "primary.light",
	p: 4,
};

const rootSx: SxProps<Theme> = {
	alignItems: "center",
	height: "100%",
	justifyContent: "center",
	width: "100%",
};

const AUTHENTICATION_HEADER = {
	title: "Login",
	subtitle: "Access to Admin account",
};

const Login: FC = () => {
	const { isAuthenticated } = useAuthentication();

	return isAuthenticated ? (
		<Navigate to={routePaths.ADMIN_USERS} replace />
	) : (
		<Stack sx={rootSx} spacing={4}>
			<Stack sx={headerSx} spacing={2}>
				<Typography variant="h2" component="h1" fontWeight="bold">
					{AUTHENTICATION_HEADER.title}
				</Typography>
				<Typography variant="h6">{AUTHENTICATION_HEADER.subtitle}</Typography>
			</Stack>

			<Paper elevation={0} sx={containerSx}>
				<LoginForm />
			</Paper>
		</Stack>
	);
};

export default Login;
