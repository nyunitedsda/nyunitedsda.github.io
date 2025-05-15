"use client";

import { createTheme, responsiveFontSizes } from "@mui/material/styles";

// Create a theme instance with spiritual and welcoming colors
const theme = responsiveFontSizes(
	createTheme({
		colorSchemes: {
			dark: true,
		},
		palette: {
			primary: {
				main: "#187cc2", // Deep purple - represents spirituality
				// light: "#9162e4",
				// dark: "#280680",
			},
			secondary: {
				main: "#c0b283", // Gold - represents divinity and warmth
				light: "#f3e2b3",
				dark: "#8f8456",
			},
			background: {
				default: "#f8f8f8",
				paper: "#ffffff",
			},
			text: {
				primary: "#333333",
				secondary: "#666666",
			},
			error: {
				main: "#d32f2f",
			},
			warning: {
				main: "#f9a825",
			},
			info: {
				main: "#0288d1",
			},
			success: {
				main: "#388e3c",
			},
		},
		typography: {
			fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
			h1: {
				fontWeight: 700,
			},
			h2: {
				fontWeight: 700,
			},
			h3: {
				fontWeight: 600,
			},
			h4: {
				fontWeight: 600,
			},
			h5: {
				fontWeight: 500,
			},
			h6: {
				fontWeight: 500,
			},
		},
		shape: {
			borderRadius: 8,
		},
		components: {
			MuiButton: {
				styleOverrides: {
					root: {
						textTransform: "none",
						fontWeight: 600,
					},
					containedPrimary: {
						"&:hover": {
							boxShadow: "0 8px 16px 0 rgba(94, 53, 177, 0.3)",
						},
					},
				},
			},
			MuiCard: {
				styleOverrides: {
					root: {
						borderRadius: 12,
						boxShadow: "0 6px 16px rgba(0, 0, 0, 0.08)",
					},
				},
			},
			MuiAppBar: {
				styleOverrides: {
					root: {
						boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
					},
				},
			},
		},
	}),
);

export default theme;
