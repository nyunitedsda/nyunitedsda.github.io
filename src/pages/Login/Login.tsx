import { LoginForm } from "@forms/collection";
import { useAuthentication } from "@hooks/auth";
import { routePaths } from "@hooks/routes";
import Typography from "@mui/material/Typography";
import { Card, Flex } from "antd";
import type { CSSProperties, FC } from "react";
import { Navigate } from "react-router-dom";

const containerSx: CSSProperties = {
	borderRadius: 16,
	padding: 32,
	display: "flex",
	flexDirection: "column",
	gap: 16,
};

const headerSx: CSSProperties = {
	position: "relative",
	textAlign: "center",
	color: "primary.light",
	padding: '32px',
	gap: '16px',
};

const rootSx: CSSProperties = {
	alignItems: "center",
	height: "100%",
	justifyContent: "center",
	width: "100%",
	gap: '32px'
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
		<Flex vertical style={rootSx} >
			<Flex vertical style={headerSx} >
				<Typography variant="h2" component="h1" fontWeight="bold">
					{AUTHENTICATION_HEADER.title}
				</Typography>
				<Typography variant="h6">{AUTHENTICATION_HEADER.subtitle}</Typography>
			</Flex >

			<Card  style={containerSx}>
				<LoginForm />
			</Card>
		</Flex >
	);
};

export default Login;
