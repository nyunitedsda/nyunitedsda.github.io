import HomeOutlined from "@mui/icons-material/HomeOutlined";
import LoginOutlined from "@mui/icons-material/LoginOutlined";
import RefreshOutlined from "@mui/icons-material/RefreshOutlined";
import { createElement } from "react";

export const ERROR_MSG = "Access Denied";
export const APOLOGY_MSG = "You don't have permission to access this resource";
export const DESCRIPTION_MSG =
	"Please contact your administrator or sign in with appropriate credentials to continue.";
export const REFRESH = "Try Again";
export const HOME = "Go Home";
export const LOGIN = "Sign In";

export const ERROR_BUTTONS = [
	{
		label: REFRESH,
		action: "refresh",
		icon: createElement(RefreshOutlined),
		color: "secondary",
	},
	{
		label: LOGIN,
		action: "redirect",
		icon: createElement(LoginOutlined),
		variant: "contained",
	},
	{
		label: HOME,
		action: "redirect",
		icon: createElement(HomeOutlined),
	},
];
