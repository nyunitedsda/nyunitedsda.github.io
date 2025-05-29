import { ListItemButton, ListItemIcon } from "@mui/material";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { SxProps, Theme } from "@mui/material/styles";
import { type FC, memo, useCallback } from "react";
import { useNavigate } from "react-router";
import type { MenuDrawerProps } from "./types";

const rootSx: SxProps<Theme> = {
	textAlign: "center",
	width: 350,
	height: "100%",
	p: 1,
	pt: 0,
};

const MenuDrawer: FC<MenuDrawerProps> = ({
	isActive,
	toggleDrawer,
	title,
	menuItems,
}) => {
	const navigate = useNavigate();

	const handleClick = useCallback((path: string) => {
		navigate(path);
		toggleDrawer();
	}, []);

	return (
		<Stack onClick={toggleDrawer} sx={rootSx}>
			<Stack
				sx={{
					height: (theme) => `${theme.spacing(8)}`,
					borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
					justifyContent: "center",
				}}
			>
				<Typography
					variant="h5"
					sx={{
						fontWeight: "bold",
						color: "primary.light",
						fontFamily: "inter",
					}}
				>
					{title}
				</Typography>
			</Stack>
			<List>
				{menuItems.map((item) => (
					<ListItemButton
						key={item.name}
						disabled={item.name === "Login"}
						onClick={() => handleClick(item.path)}
						sx={{
							borderRadius: 0.5,
							"& .MuiTypography-root": {
								fontWeight: isActive(item.path) ? "bold" : "normal",
							},
							color: isActive(item.path)
								? "primary.contrastText"
								: "text.secondary",
							bgcolor: isActive(item.path) ? "primary.light" : "transparent",
							"&:hover": { bgcolor: "action.hover" },
						}}
					>
						{item.icon && (
							<ListItemIcon
								sx={{
									color: isActive(item.path)
										? "primary.contrastText"
										: "text.secondary",
								}}
							>
								{item.icon}
							</ListItemIcon>
						)}
						<ListItemText primary={item.name} />
					</ListItemButton>
				))}

				{/* TODO: Update menuItems with login  */}
			</List>
		</Stack>
	);
};

export default memo(MenuDrawer);
