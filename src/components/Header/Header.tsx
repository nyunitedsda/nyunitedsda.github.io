import { Login, Menu } from "@mui/icons-material";
import {
	AppBar,
	Box,
	Button,
	Container,
	Drawer,
	IconButton,
	type SxProps,
	type Theme,
	Toolbar,
	Typography,
} from "@mui/material";
import { useCallback, useState } from "react";
import { useLocation } from "react-router";
import { WEBSITE_TITLE } from "../../appConstants";
import logo from "../../assets/img/NY United Logo small.png";
import navItems from "../../constants/navItems";
import { BASE_URL } from "../../constants/routes";
import ThemeToggleButton from "../Buttons/ThemeToggleButton";
import MenuDrawer from "./MenuDrawer";

const brandingSx: SxProps<Theme> = {
	flexGrow: 1,
	fontWeight: 700,
	textDecoration: "none",
};

const logoSx: SxProps<Theme> = {
	flexGrow: 1,
	display: { xs: "flex" },
	alignItems: "center",
	gap: 2,
};

const menuSx: SxProps<Theme> = {
	flexGrow: 1,
	display: { xs: "none", md: "flex" },
	justifyContent: "center",
};

const LOGO_ALT = `An Arch containing 3 trumpets above a city, located above ${WEBSITE_TITLE}`;
const LOGIN = "Login";

export default function Header() {
	const [drawerOpen, setDrawerOpen] = useState(false);
	const { pathname } = useLocation();

	const handleDrawerToggle = useCallback(() => {
		setDrawerOpen(!drawerOpen);
	}, []);

	const isActive = useCallback((path: string) => {
		return pathname === path;
	}, []);

	return (
		<AppBar
			position="sticky"
			color="default"
			elevation={1}
			sx={{ bgcolor: "background.paper" }}
		>
			<Container maxWidth="lg">
				<Toolbar disableGutters>
					<Box sx={logoSx}>
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
							component={"a"}
							href={`${BASE_URL}/`}
							color="primary"
							sx={brandingSx}
						>
							{WEBSITE_TITLE}
						</Typography>
					</Box>

					{/* Menu */}
					<Box sx={menuSx}>
						{navItems.map((item) => (
							<Button
								key={item.name}
								href={item.path}
								sx={{
									my: 2,
									mx: 1,
									color: isActive(item.path) ? "primary.main" : "text.primary",
									display: "flex",
									fontWeight: isActive(item.path) ? "bold" : "medium",
									"&:after": isActive(item.path)
										? {
												content: '""',
												position: "absolute",
												bottom: 0,
												left: "25%",
												width: "50%",
												height: "3px",
												bgcolor: "primary.main",
												borderRadius: "3px 3px 0 0",
											}
										: {},
								}}
							>
								{item.name}
							</Button>
						))}
					</Box>

					<Box sx={{ display: { xs: "none", md: "flex" }, px: 2 }}>
						<ThemeToggleButton />
					</Box>
					<Box sx={{ flexGrow: 0 }}>
						<Button
							disabled
							href={`${BASE_URL}/login`}
							variant={isActive(`${BASE_URL}/login`) ? "contained" : "text"}
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
				<MenuDrawer
					isActive={isActive}
					menuItems={navItems}
					toggleDrawer={handleDrawerToggle}
					title={WEBSITE_TITLE}
				/>
			</Drawer>
		</AppBar>
	);
}
