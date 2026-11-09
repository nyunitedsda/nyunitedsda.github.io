import { LoginOutlined, LogoutOutlined } from "@ant-design/icons";
import { useAuthentication } from "@hooks/auth";
import { routePaths } from "@hooks/routes";
import { Button, type ButtonProps, Skeleton, theme } from "antd";
import React, { type FC, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const LOGIN_TITLE = "Login";
const LOGOUT_TITLE = "Logout";

const LoginButton: FC<{ expanded?: boolean }> = ({ expanded = false }) => {
	const navigate = useNavigate();
	const { isAuthenticated, logout } = useAuthentication();
	const { token } = theme.useToken();

	const handleLogout = useCallback(async () => {
		try {
			await logout();
		} catch (error) {
			console.error("Logout error:", error);
		} finally {
			navigate(routePaths.HOME, { replace: true });
		}
	}, [logout, navigate]);

	const commonProps: ButtonProps = useMemo(
		() => ({
			"aria-label": isAuthenticated ? LOGOUT_TITLE : LOGIN_TITLE,
			type: "text",
			style: expanded
				? {
						width: "100%",
						justifyContent: "flex-start",
						height: 40,
						paddingLeft: 24,
					}
				: { color: token.colorPrimary },
			onClick: isAuthenticated
				? handleLogout
				: () => navigate(routePaths.LOGIN),
			icon: isAuthenticated ? (
				<LogoutOutlined
					style={{ color: token.colorPrimary, fontSize: "20px" }}
				/>
			) : (
				<LoginOutlined
					style={{ color: token.colorPrimary, fontSize: "20px" }}
				/>
			),
			title: isAuthenticated ? LOGOUT_TITLE : LOGIN_TITLE,
		}),
		[expanded, isAuthenticated, handleLogout, navigate, token.colorPrimary],
	);

	return (
		<React.Suspense
			fallback={
				<Skeleton.Button
					shape={expanded ? "square" : "circle"}
					active
					size={"medium"}
				/>
			}
		>
			<Button {...commonProps}>{expanded && commonProps.title}</Button>
		</React.Suspense>
	);
};

LoginButton.displayName = "LoginButton";
export default LoginButton;
