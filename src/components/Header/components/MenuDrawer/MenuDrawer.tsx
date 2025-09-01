import { LoginButton, ThemeButton } from "@components/Buttons";
import {
	MenuDrawerItem,
	type MenuDrawerProps,
	MenuItemRenderer,
	menuDrawerStyles,
	OrganizationBranding,
} from "@components/Header";
import List from "@mui/material/List";
import Stack from "@mui/material/Stack";
import { type FC, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const MenuDrawer: FC<MenuDrawerProps> = ({
	isActive,
	toggleDrawer,
	menuItems,
	footer,
}) => {
	const navigate = useNavigate();

	const handleClick = useCallback(
		(path: string) => {
			navigate(path);
			toggleDrawer();
		},
		[navigate, toggleDrawer],
	);

	return (
		<Stack onClick={toggleDrawer} sx={menuDrawerStyles.rootSx}>
			<OrganizationBranding
				isLogoVisible={false}
				sx={{
					borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
				}}
			/>

			{/* Menu List */}
			<List sx={{ flexGrow: 1 }}>
				{menuItems.map((item) => (
					<MenuItemRenderer
						key={item.name}
						item={item}
						isActive={isActive}
						handleClick={handleClick}
					/>
				))}
			</List>

			<Stack
				sx={{
					borderTop: (theme) => `1px solid ${theme.palette.divider}`,
				}}
			>
				<ThemeButton expanded />
				<LoginButton />
				{footer?.map((i) => (
					<MenuDrawerItem {...i} key={i.text} />
				))}
			</Stack>
		</Stack>
	);
};

export default MenuDrawer;
