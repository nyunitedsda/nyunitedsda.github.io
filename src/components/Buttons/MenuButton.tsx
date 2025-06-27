import ExpandLessRounded from "@mui/icons-material/ExpandLessRounded";
import ExpandMoreRounded from "@mui/icons-material/ExpandMoreRounded";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Popper from "@mui/material/Popper";
import type { SxProps, Theme } from "@mui/material/styles";
import {
	type FC,
	type MouseEvent,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { useNavigate } from "react-router";
import { menuButtonStyles } from "./styles";
import type { MenuButtonProps } from "./types";

const { activeBtnSx, buttonSx } = menuButtonStyles;

const MenuButton: FC<MenuButtonProps> = (props) => {
	const { isActive, path, children, buttonProps, menuItems } = props;

	const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);
	const buttonRef = useRef<HTMLButtonElement>(null);
	const navigate = useNavigate();

	const isActiveButton = useMemo((): boolean => {
		return menuItems && menuItems?.length > 0
			? menuItems.some((i) => isActive(i.path))
			: isActive(path);
	}, [menuItems, path, isActive]);

	const endIcon = useMemo(
		() =>
			menuItems ? (
				isMenuVisible ? (
					<ExpandLessRounded />
				) : (
					<ExpandMoreRounded />
				)
			) : undefined,
		[menuItems, isMenuVisible],
	);

	const handleMenuClose = useCallback(() => {
		setIsMenuVisible(false);
	}, []);

	const handleMenuOpen = useCallback(() => {
		setIsMenuVisible(true);
	}, []);

	const handleMenuItemSelect = useCallback(
		(_event: MouseEvent<HTMLLIElement>, url: string) => {
			navigate(url);
			handleMenuClose();
		},
		[handleMenuClose],
	);

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape" && isMenuVisible) {
				handleMenuClose();
			}
		};

		document.addEventListener("keydown", handleKeyDown);
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [isMenuVisible, handleMenuClose]);

	return (
		<>
			<Button
				{...buttonProps}
				id="MenuBtn"
				aria-haspopup={menuItems ? "true" : undefined}
				aria-expanded={isMenuVisible ? "true" : undefined}
				endIcon={endIcon}
				onClick={menuItems ? handleMenuOpen : buttonProps?.onClick}
				href={menuItems ? undefined : path}
				ref={buttonRef}
				sx={
					{
						...buttonSx,
						...(isActiveButton ? activeBtnSx : {}),
					} as SxProps<Theme>
				}
			>
				{children}
			</Button>
			{isMenuVisible && menuItems && (
				<Popper
					sx={{ zIndex: 1 }}
					open={isMenuVisible}
					anchorEl={buttonRef.current}
					role={"menu"}
					placement="bottom-end"
					transition
					disablePortal
				>
					{({ TransitionProps, placement }) => (
						<Grow
							{...TransitionProps}
							style={{
								transformOrigin:
									placement === "bottom" ? "center top" : "center bottom",
							}}
						>
							<Card sx={{ py: 2, minWidth: (theme) => `${theme.spacing(25)}` }}>
								<ClickAwayListener onClickAway={handleMenuClose}>
									<MenuList id="split-button-menu" autoFocusItem>
										{menuItems?.map((i) => (
											<MenuItem
												key={i.name}
												selected={isActive(i.path)}
												onClick={(event) => handleMenuItemSelect(event, i.path)}
											>
												<ListItemText primary={i.name} />
											</MenuItem>
										))}
									</MenuList>
								</ClickAwayListener>
							</Card>
						</Grow>
					)}
				</Popper>
			)}
		</>
	);
};

export default MenuButton;
