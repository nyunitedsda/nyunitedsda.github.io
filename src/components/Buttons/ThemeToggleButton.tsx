import DarkModeTwoTone from "@mui/icons-material/DarkModeTwoTone";
import LightModeRounded from "@mui/icons-material/LightModeRounded";
import IconButton from "@mui/material/IconButton";
import { useColorScheme } from "@mui/material/styles";
import { type FC, useCallback, useMemo } from "react";

const ThemeToggleButton: FC = () => {
	const { mode, setMode } = useColorScheme();

	const toggledMode = useMemo(
		() => (mode === "light" ? "dark" : "light"),
		[mode],
	);

	const _handleBtnClick = useCallback<() => void>(() => {
		setMode(toggledMode);
	}, [setMode, toggledMode]);

	if (!mode) {
		return null;
	}

	return (
		<IconButton onClick={_handleBtnClick} title={`Switch to ${toggledMode}`}>
			{mode === "dark" ? (
				<LightModeRounded sx={{color: theme => `${theme.palette.warning.main} !important`}} />
			) : (
				<DarkModeTwoTone
					sx={{ color: (theme) => `${theme.palette.primary.light} !important` }}
				/>
			)}
		</IconButton>
	);
};

export default ThemeToggleButton;
