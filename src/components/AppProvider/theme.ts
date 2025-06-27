import { alpha, createTheme, responsiveFontSizes } from "@mui/material/styles";

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
			MuiMenuItem: {
				styleOverrides: {
					root: ({ theme }) => ({
						"&": {
							height: theme.spacing(6),
							paddingLeft: `${theme.spacing(2)}`,
							borderRadius: 3,
						},
						"&.Mui-selected": {
							fontWeight: "bold",
							backgroundColor: `${theme.palette.primary.light}`,
							color: `${theme.palette.primary.contrastText} !important`,
							"& svg": {
								color: theme.palette.primary.contrastText,
							},
							"&:hover": {
								backgroundColor: alpha(theme.palette.primary.main, 0.7),
							},
						},
						"&:not(.Mui-selected):hover": {
							backgroundColor: alpha(theme.palette.primary.light, 0.7),
							color: theme.palette.primary.contrastText,
						},
					}),
				},
			},
			MuiListItemText: {
				styleOverrides: {
					root: ({ theme }) => ({
						paddingLeft: `${theme.spacing(1)}`,
						"& .MuiTypography-root": {
							textAlign: "start",
						},
					}),
				},
			},
			MuiButtonBase: {
				styleOverrides: {
					root: {},
				},
			},
			MuiButton: {
				styleOverrides: {
					root: ({ theme }) => ({
						"&": {
							// color: theme.palette.text.primary,
							fontSize: theme.typography.body1.fontSize,
						},
					}),
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
			MuiTypography: {
				styleOverrides: {
					root: ({ theme }) => ({
						"& :not(.Mui-selected)": {
							color: theme.palette.text.primary,
						},
					}),
				},
			},
		},
	}),
);

export default theme;
