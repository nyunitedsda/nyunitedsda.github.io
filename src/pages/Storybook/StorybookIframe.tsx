import Box from "@mui/material/Box";
import type { SxProps, Theme } from "@mui/material/styles";
import type { FC } from "react";

const rootSx: SxProps<Theme> = {
	width: "100%",
	height: "100%",
	border: "none",
	borderRadius: 1,
	boxShadow: 3,
};

const TITLE = "Component Library";

const StorybookIframe: FC = () => {
	// Build the URL for your Storybook instance
	// This assumes Storybook is running on localhost:6006 during development
	// For production, you would build Storybook and serve it from a specific URL
	const getStorybookUrl = () => {
		// For development
		if (import.meta.env.DEV) {
			return "http://localhost:6006";
		}

		// For production - using relative path based on your GitHub Pages deployment
		// This path assumes Storybook static files are copied to the dist root during build
		return `${window.location.origin}${import.meta.env.BASE_URL || "/"}/storybook-static`;
	};

	return (
		<Box component="iframe" src={getStorybookUrl()} title={TITLE} sx={rootSx} />
	);
};

export default StorybookIframe;
