import MenuRounded from "@mui/icons-material/MenuRounded";
import { useMediaQuery } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import { type FC, useCallback, useState } from "react";
import { useLocation } from "react-router";
import useFormattedRoutes from "../../hooks/routes/useFormattedRoutes";
import MenuButton from "../Buttons/MenuButton";
import ThemeToggleButton from "../Buttons/ThemeToggleButton";
import PageContentContainer from "../PageWrapper/PageContentContainer";
import OrganizationBranding from "./components/OrganizationBranding";
import Sidebar from "./components/Sidebar";
import { headerStyles } from "./styles";

const { hamburgerMenuSx, rootSx, desktopMenuSx, desktopDisplaySx } =
	headerStyles;

const Header: FC = () => {
	const [drawerOpen, setDrawerOpen] = useState(false);
	const { pathname } = useLocation();
	const { menuItems } = useFormattedRoutes();
	const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));

	const handleDrawerToggle = useCallback(() => {
		setDrawerOpen((d) => !d);
	}, []);

	const isActive = useCallback(
		(path: string) => {
			return pathname === path;
		},
		[pathname],
	);

	return (
		<AppBar position="sticky" color="default" elevation={1} sx={rootSx}>
			<PageContentContainer
				sx={{ height: (theme) => `${theme.spacing(8)}` }}
				maxWidth="lg"
			>
				<Toolbar disableGutters>
					{/* Mobile Hamburger Menu */}
					<IconButton
						sx={hamburgerMenuSx}
						aria-label="open drawer"
						color="primary"
						edge="start"
						onClick={handleDrawerToggle}
						size="large"
					>
						<MenuRounded />
					</IconButton>

					<OrganizationBranding />

					{/* Menu */}
					<Box sx={desktopMenuSx}>
						{menuItems.map((item) => (
							<MenuButton
								key={item.name}
								path={item.path}
								isActive={isActive}
								menuItems={item?.children}
							>
								{item.name}
							</MenuButton>
						))}
					</Box>

					<Box sx={desktopDisplaySx}>
						<ThemeToggleButton />
					</Box>
				</Toolbar>
			</PageContentContainer>
			{drawerOpen && isMobile && (
				<Sidebar
					open={drawerOpen}
					onClose={handleDrawerToggle}
					isActive={isActive}
				/>
			)}
		</AppBar>
	);
};

export default Header;
