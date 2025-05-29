import { useColorScheme } from "@mui/material/styles";
import { useCallback } from "react";

const useColorTheme = () => {
	const { mode, setMode } = useColorScheme();

	const toggleMode = useCallback(() => {
		setMode(mode === "light" ? "dark" : "light");
	}, [mode, setMode]);

	return {
		mode,
		setMode,
		toggleMode,
	};
};

export default useColorTheme;
