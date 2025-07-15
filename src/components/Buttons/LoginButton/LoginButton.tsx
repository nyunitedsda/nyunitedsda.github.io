import LoginOutlined from "@mui/icons-material/LoginOutlined";
import Button from "@mui/material/Button";
import { type FC, memo } from "react";
import { useNavigate } from "react-router";

const LOGIN_TITLE = "Login";

const LoginButton: FC = () => {
	const navigate = useNavigate();
	return (
		<Button
			fullWidth
			color="primary"
			sx={{ color: "primary.light" }}
			onClick={() => navigate("/login")}
			startIcon={<LoginOutlined />}
		>
			{LOGIN_TITLE}
		</Button>
	);
};

export default memo(LoginButton);
