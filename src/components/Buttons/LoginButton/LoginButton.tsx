import Button, { type ButtonProps } from "@mui/material/Button";
import { type FC, lazy, useMemo } from "react";
import { useNavigate } from "react-router";
import { useAuthentication } from "../../../hooks/auth";
import routePaths from "../../../hooks/routes/routePaths";

const LogoutOutlined = lazy(() => import("@mui/icons-material/LogoutOutlined"));
const LoginOutlined = lazy(() => import("@mui/icons-material/LoginOutlined"));

const LOGIN_TITLE = "Login";
const LOGOUT_TITLE = "Logout";

const LoginButton: FC<{ expanded?: boolean }> = ({ expanded = false }) => {
	const navigate = useNavigate();
	const { isAuthenticated, logout } = useAuthentication();

	const commonProps: ButtonProps = useMemo(
		() => ({
			fullWidth: expanded,
			color: "primary",
			sx: { color: "primary.light" },
			onClick: isAuthenticated ? logout : () => navigate(routePaths.LOGIN),
			startIcon: isAuthenticated ? <LogoutOutlined /> : <LoginOutlined />,
			title: isAuthenticated ? LOGOUT_TITLE : LOGIN_TITLE,
		}),
		[expanded, isAuthenticated, logout, navigate],
	);

	return <Button {...commonProps}>{commonProps.title}</Button>;
};

LoginButton.displayName = "LoginButton";
export default LoginButton;
