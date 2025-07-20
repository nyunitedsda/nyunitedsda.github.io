import Button from "@mui/material/Button";
import { type FC, lazy } from "react";
import { useNavigate } from "react-router";
import { useAuthentication } from "../../../hooks/auth";
import { ROUTE_PATHS } from "../../../hooks/routes/reviewedRoutes";

const LogoutOutlined = lazy(() => import("@mui/icons-material/LogoutOutlined"));
const LoginOutlined = lazy(() => import("@mui/icons-material/LoginOutlined"));

const LOGIN_TITLE = "Login";
const LOGOUT_TITLE = "Logout";

const LoginButton: FC = () => {
	const navigate = useNavigate();
	const { isAuthenticated, logout } = useAuthentication();

	return (
		<>
			{!isAuthenticated ? (
				<Button
					fullWidth
					color="primary"
					sx={{ color: "primary.light" }}
					onClick={() => navigate(ROUTE_PATHS.LOGIN)}
					startIcon={<LoginOutlined />}
				>
					{LOGIN_TITLE}
				</Button>
			) : (
				<Button
					fullWidth
					color="primary"
					sx={{ color: "primary.light" }}
					onClick={logout}
					startIcon={<LogoutOutlined />}
				>
					{LOGOUT_TITLE}
				</Button>
			)}
		</>
	);
};

LoginButton.displayName = "LoginButton";
export default LoginButton;
