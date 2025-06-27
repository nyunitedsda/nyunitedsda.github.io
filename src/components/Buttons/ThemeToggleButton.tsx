import { DarkModeRounded } from "@mui/icons-material";
import DarkModeTwoTone from "@mui/icons-material/DarkModeTwoTone";
import LightModeRounded from "@mui/icons-material/LightModeRounded";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import { type SxProps, type Theme, useColorScheme } from "@mui/material/styles";
import {
	type FC,
	type MouseEvent,
	type TouchEvent,
	useCallback,
	useMemo,
} from "react";

import day from "./daytheme.svg";
// import night from ""

const expandedBtnSx: SxProps<Theme> = {
	position: "relative",
	alignItems: "center",
	borderRadius: 16,
	cursor: "pointer",
	height: "100%",
	padding: "2px",
	transition: "background-color 0.3s ease",
	width: 120,
	border: (theme) => `2px inset ${theme.palette.divider}`,
	background: `center / 110%  no-repeat url('${day}')`,
	// ...(theme => theme.applyStyles('dark', {
	// 	background: `url('${night}')`,
	// }))
};

const sunSx: SxProps<Theme> = {
	position: "relative",
	right: 0,
	transition: "transform 0.3s ease",
	transform: "rotate(0deg) translateX(48px)",
	"&:active": {
		transform: "translateX(-48px) rotate(360deg)",
	},
};

const moonSx: SxProps<Theme> = {
	position: "relative",
	left: 0,
	transition: "transform 0.3s ease",
	transform: "rotate(0deg) translateX(-48px)",
	"&:active": {
		transform: "translateX(48px) rotate(360deg)",
	},
};

const iconSx: SxProps<Theme> = {
	borderRadius: "50%",
	width: 28,
	height: 28,
	boxShadow: 4,
	transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
	"&:active": {
		transform: (theme) =>
			`scale(1.3) ${theme.palette.mode === "dark" ? "translateX(-3px)" : "translateX(-48px)"}`,
	},
};

const ThemeToggleButton: FC<{ expanded?: boolean }> = ({
	expanded = false,
}) => {
	const { mode, setMode } = useColorScheme();

	const toggledMode = useMemo(
		() => (mode === "light" ? "dark" : "light"),
		[mode],
	);

	const _handleBtnClick = useCallback<
		(
			e:
				| MouseEvent<HTMLButtonElement>
				| TouchEvent<HTMLButtonElement>
				| MouseEvent<HTMLAnchorElement>
				| TouchEvent<HTMLAnchorElement>,
		) => void
	>(
		(e) => {
			e.stopPropagation();
			setMode(toggledMode);
		},
		[setMode, toggledMode],
	);

	if (!mode) {
		return null;
	}

	return (
		<>
			{expanded ? (
				<ListItem
					title={`Switch to ${toggledMode} mode`}
					sx={{ height: "48px" }}
				>
					<Button
						// onTouchStart={_handleBtnClick}
						onClick={_handleBtnClick}
						sx={expandedBtnSx}
					>
						{mode === "dark" ? (
							<LightModeRounded color="warning" sx={[iconSx, sunSx]} />
						) : (
							<DarkModeRounded
								sx={[
									iconSx,
									moonSx,
									{
										fill: (theme) => theme.palette.primary.contrastText,
										color: (theme) => theme.palette.primary.light,
										backgroundColor: (theme) => theme.palette.primary.light,
									},
								]}
							/>
						)}
					</Button>

					<Typography sx={{ ml: 2 }}>{"Theme"}</Typography>
				</ListItem>
			) : (
				<IconButton
					onClick={_handleBtnClick}
					title={`Switch to ${toggledMode} mode`}
				>
					{mode === "dark" ? (
						<LightModeRounded color="warning" />
					) : (
						<DarkModeTwoTone htmlColor="primary" />
					)}
				</IconButton>
			)}
		</>
	);
};

export default ThemeToggleButton;
