import Box from "@mui/material/Box";
import type { SxProps, Theme } from "@mui/material/styles";
import { useLayoutEffect, type FC } from "react";

const rootSx: SxProps<Theme> = {
	width: "100%",
	height: "100dvh",
	border: "none",
};

const TITLE = "Component Library";

const StorybookIframe: FC = () => {
	useLayoutEffect(() => {
		document.getElementById(".page-container")?.classList.add("no-content");
		return document
			.getElementById("page-container")
			?.classList.remove("no-content");
	}, []);

	const getStorybookUrl = () => {
		// For development
		if (import.meta.env.DEV) {
			return "http://localhost:6006";
		}

		// For production - using relative path based on your GitHub Pages deployment
		// This path assumes Storybook static files are copied to the dist root during build
		// return `${window.location.origin}${import.meta.env.BASE_URL || "/"}/storybook-static`;
		// TODO: Should only be accessible through the api
		return import.meta.env.VITE_PROD_STORYBOOK_URL || "/storybook-static";
	};

	return (
		<Box component="iframe" src={getStorybookUrl()} title={TITLE} sx={rootSx} />
	);
};

export default StorybookIframe;
