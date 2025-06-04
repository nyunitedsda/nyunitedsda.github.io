import Drawer from "@mui/material/Drawer";
import { type FC, useCallback, useMemo } from "react";
import useFormattedRoutes from "../../../hooks/routes/useFormattedRoutes";
import useColorTheme from "../../../hooks/theme/useColorTheme";
import ThemeToggleButton from "../../Buttons/ThemeToggleButton";
import MenuDrawer from "./MenuDrawer";
import type { MenuDrawerItemProps, SidebarProps } from "./types";

const settingOptions: Omit<MenuDrawerItemProps, "onClick">[] = [
	{
		icon: <ThemeToggleButton />,
		text: "Theme",
		isActive: false,
	},
];

const Sidebar: FC<SidebarProps> = ({ isActive, open, onClose }) => {
	const { toggleMode } = useColorTheme();
	const { menuItems } = useFormattedRoutes();

	const handleClick = useCallback(() => {
		toggleMode();
		onClose();
	}, []);

	const footerMenuItems = useMemo(() => {
		const onClickHandlers: Record<string, () => void> = {
			Theme: handleClick,
		};

		return settingOptions.map((i) => ({
			...i,
			onClick: onClickHandlers[i.text],
		}));
	}, []);

	return (
		<Drawer
			anchor="left"
			open={open}
			onClose={onClose}
			ModalProps={{
				keepMounted: true, // Better open performance on mobile.
			}}
			slotProps={{
				paper: {
					sx: {
						maxWidth: 360,
						width: '100%',
					}
				}
			}}
		>
			<MenuDrawer
				isActive={isActive}
				menuItems={menuItems}
				toggleDrawer={onClose}
				footer={footerMenuItems}
			/>
		</Drawer>
	);
};

export default Sidebar;
