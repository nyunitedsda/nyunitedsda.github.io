import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { SxProps, Theme } from "@mui/material/styles";
import type { FC } from "react";
import UserAccessForm from "../../forms/collection/UserAccessForm/UserAccessForm";

const containerSx: SxProps<Theme> = {
	borderRadius: 2,
	p: 4,
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
	return (
		<Stack sx={rootSx} spacing={4}>
			<Stack sx={headerSx} spacing={2}>
				<Typography variant="h2" component="h1" fontWeight="bold">
					{AUTHENTICATION_HEADER.title}
				</Typography>
				<Typography variant="h6">{AUTHENTICATION_HEADER.subtitle}</Typography>
			</Stack>

			<Paper elevation={0} sx={containerSx}>
				<UserAccessForm />
			</Paper>
		</Stack>
	);
};

export default Login;
