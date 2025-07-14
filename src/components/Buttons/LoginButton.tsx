import LoginOutlined from "@mui/icons-material/LoginOutlined";
import Button from "@mui/material/Button";
import { memo, type FC } from "react";
import { useNavigate } from "react-router";

const LOGIN_TITLE = "Login";

const LoginButton: FC = () => {
	const navigate = useNavigate();
	return (
		<Button
			// variant="outlined"
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
