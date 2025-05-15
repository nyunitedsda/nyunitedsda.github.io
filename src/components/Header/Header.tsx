"use client";

import {
	Article,
	ChevronRight,
	ContactMail,
	Home,
	LiveTv,
	Login,
	Menu,
} from "@mui/icons-material";
import {
	AppBar,
	Box,
	Button,
	Container,
	Drawer,
	IconButton,
	List,
	ListItem,
	ListItemText,
	type SxProps,
	type Theme,
	Toolbar,
	Typography,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import { useState } from "react";
import { WEBSITE_TITLE } from "../../appConstants";
// import Link from "next/link"
// import { usePathname } from "next/navigation"
import logo from "../../assets/img/NY United Logo small.png";
import navItems from "../../constants/navItems";
import ThemeToggleButton from "../Buttons/ThemeToggleButton";

const brandingSx: SxProps<Theme> = {
	flexGrow: 1,
	fontWeight: 700,
	textDecoration: "none",
};

const LOGO_ALT = `An Arch containing 3 trumpets above a city, located above ${WEBSITE_TITLE}`;
const LOGIN = "Login";

export default function Header() {
	const [drawerOpen, setDrawerOpen] = useState(false);
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));
	// const pathname = usePathname()

	const handleDrawerToggle = () => {
		setDrawerOpen(!drawerOpen);
	};

	const isActive = (path: string) => {
		// return pathname === path
	};

	const drawer = (
		<Box onClick={handleDrawerToggle} sx={{ textAlign: "center", width: 250 }}>
			<Typography
				variant="h6"
				sx={{ my: 2, fontWeight: "bold", color: "primary.main" }}
			>
				{WEBSITE_TITLE}
			</Typography>
			<List>
				{navItems.map((item) => (
					<ListItem
						key={item.name}
						component={"a"}
						// component={Link}
						href={item.path}
						sx={{
							// color: isActive(item.path) ? "primary.main" : "text.primary",
							// bgcolor: isActive(item.path) ? "action.selected" : "transparent",
							"&:hover": { bgcolor: "action.hover" },
						}}
					>
						<Box sx={{ mr: 2 }}>{item.icon}</Box>
						<ListItemText primary={item.name} />
						{/* {isActive(item.path) && <ChevronRight />} */}
					</ListItem>
				))}
				<ListItem
					// component={Link}
					component={"a"}
					href="/login"
					sx={{
						// color: isActive("/login") ? "primary.main" : "text.primary",
						// bgcolor: isActive("/login") ? "action.selected" : "transparent",
						"&:hover": { bgcolor: "action.hover" },
					}}
				>
					<Box sx={{ mr: 2 }}>
						<Login />
					</Box>
					<ListItemText primary="Login" />
					{/* {isActive("/login") && <ChevronRight />} */}
				</ListItem>
			</List>
		</Box>
	);

	return (
		<AppBar
			position="sticky"
			color="default"
			elevation={1}
			sx={{ bgcolor: "background.paper" }}
		>
			<Container maxWidth="lg">
				<Toolbar disableGutters>
					<Box
						sx={{
							flexGrow: 1,
							display: { xs: "flex" },
							alignItems: "center",
							gap: 2,
						}}
					>
						{/* Logo */}
						<Box sx={{ display: { xs: "none", md: "flex" } }}>
							<img src={logo} alt={LOGO_ALT} height={38} />
						</Box>
						{/* Mobile Hamburger Menu */}
						<IconButton
							sx={{ display: { xs: "flex", md: "none" } }}
							aria-label="open drawer"
							color="inherit"
							edge="start"
							onClick={handleDrawerToggle}
							size="large"
						>
							<Menu />
						</IconButton>

						{/* Company branding */}
						<Typography
							variant="h6"
							// component={Link}
							component={"a"}
							href="/"
							color="primary"
							sx={brandingSx}
						>
							{WEBSITE_TITLE}
						</Typography>
					</Box>

					{/* Menu */}
					<Box
						sx={{
							flexGrow: 1,
							display: { xs: "none", md: "flex" },
							justifyContent: "center",
						}}
					>
						{navItems.map((item) => (
							<Button
								key={item.name}
								// component={Link}
								href={item.path}
								sx={{
									my: 2,
									mx: 1,
									// color: isActive(item.path) ? "primary.main" : "text.primary",
									display: "flex",
									// fontWeight: isActive(item.path) ? "bold" : "medium",
									// "&:after": isActive(item.path)
									//   ? {
									//       content: '""',
									//       position: "absolute",
									//       bottom: 0,
									//       left: "25%",
									//       width: "50%",
									//       height: "3px",
									//       bgcolor: "primary.main",
									//       borderRadius: "3px 3px 0 0",
									//     }
									//   : {},
								}}
							>
								{item.name}
							</Button>
						))}
					</Box>

					<Box sx={{ display: { xs: "none", md: "flex" } }}>
						<ThemeToggleButton />
					</Box>
					<Box sx={{ flexGrow: 0 }}>
						<Button
							// component={Link}
							href="/login"
							// variant={isActive("/login") ? "contained" : "outlined"}
							color="primary"
							startIcon={<Login />}
							sx={{ display: { xs: "none", md: "flex" } }}
						>
							{LOGIN}
						</Button>
					</Box>
				</Toolbar>
			</Container>

			<Drawer
				anchor="left"
				open={drawerOpen}
				onClose={handleDrawerToggle}
				ModalProps={{
					keepMounted: true, // Better open performance on mobile.
				}}
			>
				{drawer}
			</Drawer>
		</AppBar>
	);
}
