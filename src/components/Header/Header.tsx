import { Menu } from "@mui/icons-material";
import {
	AppBar,
	Box,
	Button,
	Container,
	Drawer,
	IconButton,
	MenuItem,
	type SxProps,
	type Theme,
	Toolbar,
	Typography,
} from "@mui/material";
import { type FC, useCallback, useMemo, useState } from "react";
import { useLocation } from "react-router";
import logo from "../../assets/img/NY United Logo small.png";
import siteRoutes from "../../hooks/routes/siteRoutes";
import type { RouteMenu } from "../../hooks/routes/types";
import useFormattedRoutes from "../../hooks/routes/useFormattedRoutes";
import useColorTheme from "../../hooks/theme/useColorTheme";
import ThemeToggleButton from "../Buttons/ThemeToggleButton";
import MenuDrawer from "./MenuDrawer";

const brandingSx: SxProps<Theme> = {
	flexGrow: 1,
	fontWeight: 700,
	textDecoration: "none",
	fontFamily: "Inter",
	color: 'primary.light'
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
	fontFamily: "Inter",
};

const WEBSITE_TITLE =
	import.meta.env.VITE_WEBSITE_TITLE || "NY United SDA Church";
const LOGO_ALT = `An Arch containing 3 trumpets above a city, located above ${WEBSITE_TITLE}`;
const HOME = "Home";

const Header: FC = () => {
	const [drawerOpen, setDrawerOpen] = useState(false);
	const { pathname } = useLocation();
	const { menuItems } = useFormattedRoutes();
	const { toggleMode } = useColorTheme();

	const handleDrawerToggle = useCallback(() => {
		setDrawerOpen((d) => !d);
	}, []);

	const homeRoute = useMemo(() => {
		return siteRoutes.filter((i) => i.name === HOME)[0];
	}, []);

	const isActive = useCallback((path: string) => {
		return pathname === path;
	}, []);

	return (
		<AppBar
			position="sticky"
			color="default"
			elevation={1}
			sx={{ bgcolor: "background.paper", height: theme => `${theme.spacing(8)}` }}
		>
			<Container sx={{height: theme => `${theme.spacing(8)}`}} maxWidth="lg">
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
							variant="h5"
							component={"a"}
							href={homeRoute.path}
							sx={brandingSx}
						>
							{WEBSITE_TITLE}
						</Typography>
					</Box>

					{/* Menu */}
					<Box sx={menuSx}>
						{menuItems.map((item) => (
							<Button
								key={item.name}
								href={item.path}
								sx={{
									color: isActive(item.path) ? "primary.light" : "text.primary",
									display: "flex",
									fontWeight: isActive(item.path) ? "bold" : "normal",
									fontSize: (theme) => theme.typography.body1,
									"&:after": isActive(item.path)
										? {
											content: '""',
											position: "absolute",
											bottom: 0,
											left: "25%",
											width: "50%",
											height: "3px",
											bgcolor: "primary.light",
											borderRadius: "3px 3px 0 0",
										}
										: {},
								}}
							>
								{item.name}
							</Button>
						))}
					</Box>

					<Box sx={{ display: { xs: "none", md: "flex" } }}>
						<ThemeToggleButton />
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
					menuItems={
						[
							...menuItems,

						] as RouteMenu[]
					}
					toggleDrawer={handleDrawerToggle}
					title={WEBSITE_TITLE}
				/>
				<MenuItem onClick={() => {
					toggleMode()
					handleDrawerToggle()
				}} sx={{ display: "flex", p: 2, alignItems: 'center' }}>
					<ThemeToggleButton />
					<Typography sx={{ color: 'text.secondary' }}>{`Theme`}</Typography>
				</MenuItem>
			</Drawer>
		</AppBar>
	);
};

export default Header;
