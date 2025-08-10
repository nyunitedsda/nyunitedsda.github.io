import { useMenuItems } from "@hooks/routes";
import Drawer from "@mui/material/Drawer";
import type { FC } from "react";
import MenuDrawer from "./MenuDrawer";
import type { SidebarProps } from "./types";

const Sidebar: FC<SidebarProps> = ({ isActive, open, onClose }) => {
	const { userMenuItems } = useMenuItems();

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
						width: "100%",
					},
				},
			}}
		>
			<MenuDrawer
				isActive={isActive}
				menuItems={userMenuItems}
				toggleDrawer={onClose}
			/>
		</Drawer>
	);
};

export default Sidebar;
