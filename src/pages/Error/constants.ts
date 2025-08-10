import HomeOutlined from "@mui/icons-material/HomeOutlined";
import LoginOutlined from "@mui/icons-material/LoginOutlined";
import type { ButtonProps } from "@mui/material";
import { createElement } from "react";

const HOME = "Go Home";
const LOGIN = "Sign In";

export const PERMISSION_ERROR = {
	ERROR_MSG: "Access Denied",
	APOLOGY_MSG: "You don't have permission to access this resource",
	DESCRIPTION_MSG:
		"Please contact your administrator or sign in with appropriate credentials to continue.",
	NAV_HOME: HOME,
	NAV_LOGIN: LOGIN,
	BUTTONS: [
		{
			label: LOGIN,
			action: "redirect",
			icon: createElement(LoginOutlined),
			variant: "outlined",
			to: "login",
			color: "secondary" as ButtonProps["color"],
		},
		{
			label: HOME,
			to: "home",
			action: "redirect",
			icon: createElement(HomeOutlined),
			variant: "contained",
			color: "primary" as ButtonProps["color"],
		},
	],
};
