import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import type { SxProps, Theme } from "@mui/material";
import { type FC, useCallback, useMemo, useState } from "react";
import { useLocation } from "react-router";
import logo from "../../assets/img/NY United Logo small.png";
import siteRoutes from "../../hooks/routes/siteRoutes";
import type { RouteMenu } from "../../hooks/routes/types";
import useFormattedRoutes from "../../hooks/routes/useFormattedRoutes";
import useColorTheme from "../../hooks/theme/useColorTheme";
import ThemeToggleButton from "../Buttons/ThemeToggleButton";
import MenuDrawer from "./components/MenuDrawer";
import MenuDrawerItem from "./components/MenuDrawerItem";
import { MenuRounded } from "@mui/icons-material";

const brandingSx: SxProps<Theme> = {
	flexGrow: 1,
	fontWeight: 700,
	textDecoration: "none",
	fontFamily: "Inter",
	color: "primary.light",
};

const logoSx: SxProps<Theme> = {
	flexGrow: 1,
	display: { xs: "flex" },
	alignItems: "center",
	gap: 2,
};

const desktopDisplaySx: SxProps<Theme> = {
	display: { xs: "none", md: "flex" },
}

const desktopMenuSx: SxProps<Theme> = {
	flexGrow: 1,
	justifyContent: "center",
	fontFamily: "Inter",
	...desktopDisplaySx,
};

const rootSx: SxProps<Theme> = {
	bgcolor: "background.paper",
	height: (theme) => `${theme.spacing(8)}`,
}

const hamburgerMenuSx: SxProps<Theme> = {
	display: {
		xs: "flex",
		md: "none",
	},
}

const activeBtnSx: SxProps<Theme> = {
	color: "primary.light",
	fontWeight: 'bold',
	"&:after": {
		content: '""',
		position: "absolute",
		bottom: 0,
		left: "25%",
		width: "50%",
		height: "3px",
		bgcolor: "primary.light",
		borderRadius: "3px 3px 0 0",
	},
}

const regularBtnSx: SxProps<Theme> = {
	color: "text.primary",
	display: 'flex',
	fontSize: (theme) => theme.typography.body1,
}

// FEATURE: Enhance and ensure consistency in the desktop and mobile menu items active and regular states

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
	}, [pathname]);

	return (
		<AppBar
			position="sticky"
			color="default"
			elevation={1}
			sx={rootSx}
		>
			<Container
				sx={{ height: (theme) => `${theme.spacing(8)}` }}
				maxWidth="lg"
			>
				<Toolbar disableGutters>
					<Box sx={logoSx}>
						{/* Logo */}
						<Box sx={{ display: { xs: "none", md: "flex" } }}>
							<img src={logo} alt={LOGO_ALT} height={38} />
						</Box>

						{/* Mobile Hamburger Menu */}
						<IconButton
							sx={hamburgerMenuSx}
							aria-label="open drawer"
							color="inherit"
							edge="start"
							onClick={handleDrawerToggle}
							size="large"
						>
							<MenuRounded />
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
					<Box sx={desktopMenuSx}>
						{menuItems.map((item) => (
							<Button
								key={item.name}
								href={item.path}
								sx={{
									...regularBtnSx,
									...(isActive(item.path) ? activeBtnSx : {}),
								}}
							>
								{item.name}
							</Button>
						))}
					</Box>

					<Box sx={desktopDisplaySx}>
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
					menuItems={[...menuItems] as RouteMenu[]}
					toggleDrawer={handleDrawerToggle}
					title={WEBSITE_TITLE}
				/>

				{/* Bottom menu */}
				<MenuDrawerItem
					icon={<ThemeToggleButton />}
					isActive={false}
					onClick={() => {
						toggleMode();
						handleDrawerToggle();
					}}
					text={`Theme`}
				/>
			</Drawer>
		</AppBar>
	);
};

export default Header;
