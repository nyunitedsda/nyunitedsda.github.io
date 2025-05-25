import { DarkModeRounded, DarkModeTwoTone, LightModeRounded } from "@mui/icons-material";
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
				<LightModeRounded color="warning" />
			) : (
				<DarkModeTwoTone
					sx={{ color: (theme) => theme.palette.primary.main }}
				/>
			)}
		</IconButton>
	);
};

export default ThemeToggleButton;
