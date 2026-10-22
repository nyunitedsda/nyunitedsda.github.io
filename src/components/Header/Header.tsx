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
import { Flex, Layout, Menu, theme } from "antd";
import { createRef, type CSSProperties, type FC, useCallback, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router";

const rootStyle: CSSProperties = {
	position: 'sticky',
	top: 0,
	zIndex: 10000,
}

const Header: FC = () => {
	const [drawerOpen, setDrawerOpen] = useState(false);
	const { pathname } = useLocation();
	const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));
	const appBarRef = useMemo(() => createRef<HTMLDivElement>(), []);
	const { activeMenu } = useMenuItems();
	const navigate = useNavigate();
	const { token } = theme.useToken();

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

	const menu = useMemo(() => {
		return activeMenu.map((i) => ({
			onclick: (!i.children && i.path) ? () => navigate(i.path) : undefined,
			label: i.name,
			key: i.id,
			children: i.children ? i.children.map((si) => ({
				onclick: (si.path) ? () => navigate(si.path) : undefined,
				label: si.name,
				key: si.id,
			})) : undefined
		}));
	}, [activeMenu]);

	return (
		<>
			<Layout.Header
				style={{ ...rootStyle, background: token.colorBgContainer }}
			>
				<Flex style={{ margin: "0 auto", maxWidth: token.screenXLMax }}>
					<OrganizationBranding />

					<Menu
						mode={"horizontal"}
						items={menu}
						style={{ flex: 1, minWidth: 0, justifyContent: 'end' }}
					/>
				</Flex>
			</Layout.Header>
			{/* <Layout.Header
				style={rootStyle}
			>
				<AppBar
					ref={appBarRef}
					position="sticky"
					color="default"
					elevation={1}
					sx={headerStyles.rootSx}
				>
					<PageContentContainer sx={{ height: (theme) => `${theme.spacing(8)}` }}>
						<Toolbar disableGutters>
							{/* Mobile Hamburger Menu *
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

							{/* Menu *
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
			</Layout.Header> */}
		</>
	);
};

export default Header;
