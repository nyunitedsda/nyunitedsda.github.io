import Drawer from '@mui/material/Drawer';
import { useCallback, type FC } from 'react';
import MenuDrawer from './MenuDrawer';
import MenuDrawerItem from './MenuDrawerItem';
import ThemeToggleButton from '../../Buttons/ThemeToggleButton';
import useColorTheme from '../../../hooks/theme/useColorTheme';
import useFormattedRoutes from '../../../hooks/routes/useFormattedRoutes';
import type { SidebarProps } from './types';

const Sidebar:FC<SidebarProps> = ({isActive, open, onClose, title}) => {
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
					title={title}
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