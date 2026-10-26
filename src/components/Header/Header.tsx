import { MenuOutlined } from "@ant-design/icons";
import {
	OrganizationBranding,
} from "@components/Header";
import { useMenuItems } from "@hooks/routes";
import { Button, Drawer, Flex, Grid, Layout, Menu, theme } from "antd";
import { type CSSProperties, type FC, useCallback, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { smallLogo } from "@/assets";
import { LOGO_ALT } from "./components/OrganizationBranding";

const rootStyle: CSSProperties = {
	position: 'sticky',
	top: 0,
	zIndex: 1000,
}

// FEATURE: Shrinking the header and content on scroll

const Header: FC = () => {
	const [drawerOpen, setDrawerOpen] = useState(false);
	const { pathname } = useLocation();
	const { activeMenu } = useMenuItems();
	const navigate = useNavigate();
	const { token } = theme.useToken();
	const isMobile = Grid.useBreakpoint()?.md === false;

	const handleDrawerToggle = useCallback(() => {
		setDrawerOpen((prev) => !prev);
	}, []);

	const _isActive = useCallback(
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
			// style: isActive(i.path) ? {
			// 	borderBottom: `2px solid ${ token.colorPrimary}`,
			// 	color: 'white',
			// } : undefined,
			onClick: (!i.children && i.path) ? () => {
				if (drawerOpen) handleDrawerToggle();
				navigate(i.path)
			} : undefined,
			label: i.name,
			key: i.id,
			children: i.children ? i.children.map((si) => ({
				onClick: (!si.children && si.path) ? () => {
					if (drawerOpen) handleDrawerToggle();
					navigate(si.path)
				} : undefined,
				label: si.name,
				key: si.id,
			})) : undefined
		}));
	}, [activeMenu, drawerOpen, navigate, handleDrawerToggle]);

	return (
		<>
			<Layout.Header
				style={{ ...rootStyle, background: token.colorBgContainer, display: 'flex', alignItems: 'center' }}
			>
				<Flex style={{ margin: "0 auto", maxWidth: token.screenXL, justifyContent: 'space-between', width: '100%' }}>
					<OrganizationBranding />
					{
						isMobile ? (
							<Button
								icon={<MenuOutlined />}
								onClick={() => setDrawerOpen((d) => !d)}
								style={{ border: 0, color: token.colorPrimary, boxShadow: 'none' }}
							/>
						) : (
							<Menu
								mode={"horizontal"}
								items={menu}
								style={{ flex: 1, minWidth: 0, justifyContent: 'end' }}
							/>
						)
					}
				</Flex>
			</Layout.Header>

			<Drawer
				open={drawerOpen}
				title={
					<img src={smallLogo} alt={LOGO_ALT} height={38} />
				}
				style={{ height: '100%' }}
				placement={"left"}
				onClose={handleDrawerToggle}
				closable={{ placement: 'end' }}
			>
				<Menu
					mode={"inline"}
					items={menu}
					style={{ flex: 1, minWidth: 0, justifyContent: 'end', border: 'none' }}
				/>
			</Drawer>
		</>
	);
};

export default Header;
