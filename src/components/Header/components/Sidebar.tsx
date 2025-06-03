import Drawer from "@mui/material/Drawer";
import { type FC, useCallback } from "react";
import useFormattedRoutes from "../../../hooks/routes/useFormattedRoutes";
import useColorTheme from "../../../hooks/theme/useColorTheme";
import ThemeToggleButton from "../../Buttons/ThemeToggleButton";
import MenuDrawer from "./MenuDrawer";
import MenuDrawerItem from "./MenuDrawerItem";
import type { SidebarProps } from "./types";

const Sidebar: FC<SidebarProps> = ({ isActive, open, onClose }) => {
	const { toggleMode } = useColorTheme();
	const { menuItems } = useFormattedRoutes();

	const handleClick = useCallback(() => {
		toggleMode();
		onClose();
	}, []);

	return (
		<Drawer
			anchor="left"
			open={open}
			onClose={onClose}
			ModalProps={{
				keepMounted: true, // Better open performance on mobile.
			}}
		>
			<MenuDrawer
				isActive={isActive}
				menuItems={menuItems}
				toggleDrawer={onClose}
			/>

			{/* Bottom menu */}
			<MenuDrawerItem
				icon={<ThemeToggleButton />}
				isActive={false}
				onClick={handleClick}
				text={`Theme`}
			/>
		</Drawer>
	);
};

export default Sidebar;
