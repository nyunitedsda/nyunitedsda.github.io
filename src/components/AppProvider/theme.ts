"use client";

import { createTheme, responsiveFontSizes } from "@mui/material/styles";

// Create a theme instance with spiritual and welcoming colors
const theme = responsiveFontSizes(
	createTheme({
		colorSchemes: {
			light: {
				palette: {
					primary: {
						main: "#187cc2",
					},
				},
			},
			dark: {
				palette: {
					primary: {
						main: "#187cc2",
						dark: "#4489c9",
					},
					background: {
						default: "#1f2f41",
						paper: "#354354",
					},
				},
			},
		},
		typography: {
			fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
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
				},
				defaultProps: {
					size: "medium",
				},
			},
			MuiIconButton: {
				defaultProps: {
					size: "medium",
				},
			},
			MuiCard: {
				styleOverrides: {
					root: {
						borderRadius: 10.5,
						boxShadow: "0 6px 16px rgba(0, 0, 0, 0.08)",
					},
				},
			},
			MuiTextField: {
				defaultProps: {
					size: "small",
					required: true,
					slotProps: {
						inputLabel: {
							shrink: true,
						},
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
