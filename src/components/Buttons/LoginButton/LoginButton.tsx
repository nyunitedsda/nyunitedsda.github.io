import Button, { type ButtonProps } from "@mui/material/Button";
import { type FC, lazy, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { useAuthentication } from "../../../hooks/auth";
import { ROUTE_PATHS } from "../../../hooks/routes/reviewedRoutes";

const LogoutOutlined = lazy(() => import("@mui/icons-material/LogoutOutlined"));
const LoginOutlined = lazy(() => import("@mui/icons-material/LoginOutlined"));

const LOGIN_TITLE = "Login";
const LOGOUT_TITLE = "Logout";

const LoginButton: FC<{ expanded?: boolean }> = ({ expanded = false }) => {
	const navigate = useNavigate();
	const { isAuthenticated, logout } = useAuthentication();
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(isAuthenticated);

	useEffect(() => {
		setIsLoggedIn(isAuthenticated);
	}, [isAuthenticated]);

	const commonProps: ButtonProps = useMemo(
		() => ({
			fullWidth: expanded,
			color: "primary",
			sx: { color: "primary.light" },
			onClick: isLoggedIn ? logout : () => navigate(ROUTE_PATHS.LOGIN),
			startIcon: isLoggedIn ? <LogoutOutlined /> : <LoginOutlined />,
			title: isLoggedIn ? LOGOUT_TITLE : LOGIN_TITLE,
		}),
		[expanded, isLoggedIn],
	);

	return <Button {...commonProps}>{commonProps.title}</Button>;
};

LoginButton.displayName = "LoginButton";
export default LoginButton;
