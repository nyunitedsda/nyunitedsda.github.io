import { MoreVertOutlined } from "@mui/icons-material";
import MenuRounded from "@mui/icons-material/MenuRounded";
import { Menu, useMediaQuery, useTheme } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import {
	createRef,
	type FC,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from "react";
import { useLocation, useNavigate } from "react-router";
import useFormattedRoutes from "../../hooks/routes/useFormattedRoutes";
import LoginButton from "../Buttons/LoginButton/LoginButton";
import MenuButton from "../Buttons/MenuButton";
import ThemeToggleButton from "../Buttons/ThemeToggleButton";
import PageContentContainer from "../PageWrapper/PageContentContainer";
import MenuItemRenderer from "./components/MenuDrawer/MenuItemRenderer";
import OrganizationBranding from "./components/OrganizationBranding";
import Sidebar from "./components/Sidebar";
import { headerStyles } from "./styles";

const { hamburgerMenuSx, rootSx, desktopMenuSx, desktopDisplaySx } =
	headerStyles;

const Header: FC = () => {
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const { menuItems } = useFormattedRoutes();
	const theme = useTheme();
	const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));
	const [optionAnchorEl, setOptionAnchorEl] =
		useState<null | HTMLButtonElement>(null);
	const appBarRef = useMemo(() => createRef<HTMLDivElement>(), []);

	// Handle window resize for responsive menu calculation
	useEffect(() => {
		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const handleClick = useCallback(
		(path: string) => {
			navigate(path);
		},
		[navigate],
	);

	const handleDrawerToggle = useCallback(() => {
		setDrawerOpen((prev) => !prev);
	}, []);

	const handleOptionsMenuClose = useCallback(() => {
		setOptionAnchorEl(null);
	}, []);

	const handleOptionsMenuOpen = useCallback(
		(event: React.MouseEvent<HTMLButtonElement>) => {
			setOptionAnchorEl(event.currentTarget);
		},
		[],
	);

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
			return pathname.startsWith(path + "/");
		},
		[pathname],
	);

	const { dynamicMenuList, desktopMenuItems } = useMemo(() => {
		const baseWidth = 465;
		const appBarWidth = appBarRef?.current?.offsetWidth || 0;
		if (appBarWidth < baseWidth) {
			return {
				dynamicMenuList: [],
				desktopMenuItems: menuItems,
			};
		}

		// Calculate how many menu items can fit based on screen width
		// const baseItemCount = 5;
		const availableWidth = appBarWidth - baseWidth;
		const additionalItems = Math.floor(availableWidth / 100);
		const maxVisibleItems = Math.max(0, additionalItems);

		// If all items can fit, show them all
		if (maxVisibleItems >= menuItems.length) {
			return {
				dynamicMenuList: [],
				desktopMenuItems: menuItems,
			};
		}

		// Split items between visible and dropdown menu
		return {
			dynamicMenuList: menuItems.slice(maxVisibleItems),
			desktopMenuItems: menuItems.slice(0, maxVisibleItems),
		};
	}, [
		windowWidth,
		theme.breakpoints.values.md,
		menuItems,
		appBarRef?.current?.offsetWidth,
	]);

	// Memoize the menu open state for better performance
	const isOptionsMenuOpen = Boolean(optionAnchorEl);

	return (
		<AppBar
			ref={appBarRef}
			position="sticky"
			color="default"
			elevation={1}
			sx={rootSx}
		>
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
						{desktopMenuItems.map((item) => (
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
						{dynamicMenuList.length > 0 ? (
							<IconButton
								aria-label="more options"
								color="primary"
								onClick={handleOptionsMenuOpen}
							>
								<MoreVertOutlined color="primary" />
							</IconButton>
						) : (
							<>
								<ThemeToggleButton />
								<LoginButton />
							</>
						)}
					</Box>
				</Toolbar>
			</PageContentContainer>
			{optionAnchorEl && (
				<Menu
					anchorEl={optionAnchorEl}
					open={isOptionsMenuOpen}
					onClose={handleOptionsMenuClose}
					anchorOrigin={{
						vertical: "bottom",
						horizontal: "right",
					}}
					transformOrigin={{
						vertical: "top",
						horizontal: "right",
					}}
				>
					{dynamicMenuList.map((item) => (
						<MenuItemRenderer
							key={item.name}
							item={item}
							isActive={isActive}
							handleClick={handleClick}
						/>
					))}
					<ThemeToggleButton expanded />
					<LoginButton />
				</Menu>
			)}
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
