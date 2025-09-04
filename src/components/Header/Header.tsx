import {
	DesktopMenu,
	headerStyles,
	OrganizationBranding,
	Sidebar,
} from "@components/Header";
import { PageContentContainer } from "@components/PageWrapper";
import { useMenuItems } from "@hooks/routes";
import MenuRounded from "@mui/icons-material/MenuRounded";
import { useMediaQuery } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import { createRef, type FC, useCallback, useMemo, useState } from "react";
import { useLocation } from "react-router";

const Header: FC = () => {
	const [drawerOpen, setDrawerOpen] = useState(false);
	const { pathname } = useLocation();
	const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));
	const appBarRef = useMemo(() => createRef<HTMLDivElement>(), []);
	const { activeMenu } = useMenuItems();

	const handleDrawerToggle = useCallback(() => {
		setDrawerOpen((prev) => !prev);
	}, []);

	const isActive = useCallback(
		(path: string) => {
			// Handle exact matches first
			if (pathname === path) {
				return true;
			}

			// Handle routes with parameters (e.g., :tab, :id, etc.)
			if (path.includes(":")) {
				// Remove optional parameter indicators (?) and replace parameters with regex
				const pathPattern = path
					.replace(/\/:[^/?]+\?/g, "(?:/[^/]+)?") // Handle optional parameters like /:tab?
					.replace(/\/:[^/?]+/g, "/[^/]+") // Handle required parameters like /:id
					.replace(/\//g, "\\/"); // Escape forward slashes

				const regex = new RegExp(`^${pathPattern}$`);
				return regex.test(pathname);
			}

			// Handle base path inclusion for routes that might be parent routes
			return pathname.startsWith(`${path}/`);
		},
		[pathname],
	);

	return (
		<AppBar
			ref={appBarRef}
			position="sticky"
			color="default"
			elevation={1}
			sx={headerStyles.rootSx}
		>
			<PageContentContainer
				sx={{ height: (theme) => `${theme.spacing(8)}` }}
			>
				<Toolbar disableGutters>
					{/* Mobile Hamburger Menu */}
					<IconButton
						sx={headerStyles.hamburgerMenuSx}
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
					{!isMobile && (
						<DesktopMenu
							menuList={activeMenu}
							isActive={isActive}
							sx={{ display: { xs: "none", md: "flex" } }}
						/>
					)}
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
