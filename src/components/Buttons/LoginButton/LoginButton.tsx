import { useAuthentication } from "@hooks/auth";
import { routePaths } from "@hooks/routes";
import Button, { type ButtonProps } from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton";
import React, { type FC, lazy, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const LogoutOutlined = lazy(() => import("@mui/icons-material/LogoutOutlined"));
const LoginOutlined = lazy(() => import("@mui/icons-material/LoginOutlined"));

const LOGIN_TITLE = "Login";
const LOGOUT_TITLE = "Logout";

const LoginButton: FC<{ expanded?: boolean }> = ({ expanded = false }) => {
	const navigate = useNavigate();
	const { isAuthenticated, logout } = useAuthentication();

	const handleLogout = useCallback(async () => {
		try {
			await logout();
			navigate(routePaths.LOGIN, { replace: true });
		} catch (error) {
			console.error("Logout error:", error);
			navigate(routePaths.LOGIN, { replace: true });
		}
	}, [logout, navigate]);

	const commonProps: ButtonProps = useMemo(
		() => ({
			fullWidth: expanded,
			"aria-label": isAuthenticated ? LOGOUT_TITLE : LOGIN_TITLE,
			color: "primary",
			sx: { color: "primary.light" },
			onClick: isAuthenticated
				? handleLogout
				: () => navigate(routePaths.LOGIN),
			startIcon: isAuthenticated ? <LogoutOutlined /> : <LoginOutlined />,
			title: isAuthenticated ? LOGOUT_TITLE : LOGIN_TITLE,
		}),
		[expanded, isAuthenticated, handleLogout, navigate],
	);

	return (
		<React.Suspense
			fallback={
				<Skeleton
					variant="rectangular"
					width={expanded ? "100%" : 90}
					height={"auto"}
				/>
			}
		>
			<Button {...commonProps}>{commonProps.title}</Button>
		</React.Suspense>
	);
};

LoginButton.displayName = "LoginButton";
export default LoginButton;
