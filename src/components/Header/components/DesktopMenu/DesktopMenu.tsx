import { LoginButton, MenuButton, ThemeButton } from "@components/Buttons";
import {
	type DesktopMenuProps,
	generateMenuDisplay,
	MenuItemRenderer,
} from "@components/Header";
import IconSkeleton from "@components/ProjectSuspense";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Stack from "@mui/material/Stack";
import type { SxProps, Theme } from "@mui/material/styles";
import {
	type FC,
	lazy,
	Suspense,
	useCallback,
	useEffect,
	useId,
	useMemo,
	useState,
} from "react";
import { useNavigate } from "react-router-dom";

const MoreVertOutlined = lazy(
	() => import("@mui/icons-material/MoreVertOutlined"),
);

const rootSx: SxProps<Theme> = {
	flexGrow: 1,
	flexDirection: "row",
	justifyContent: "flex-end",
	fontFamily: "Inter",
};

const DesktopMenu: FC<DesktopMenuProps> = ({ menuList, isActive, sx }) => {
	const navigate = useNavigate();
	const uId = useId();

	const [menuWidth, setMenuWidth] = useState<number | undefined>();
	const [optionAnchorEl, setOptionAnchorEl] =
		useState<null | HTMLButtonElement>(null);

	useEffect(() => {
		const updateMenuWidth = () => {
			const clientWidth = document.getElementById("desktop-menu")?.clientWidth;
			setMenuWidth(clientWidth);
			console.table({ clientWidth })
		};

		window.addEventListener("resize", updateMenuWidth);
		// updateMenuWidth();

		return () => {
			window.removeEventListener("resize", updateMenuWidth);
		};
	}, []);

	const { displayList, optionList } = useMemo(
		() => {
			console.table({ displayList, optionList, menuList });
			return generateMenuDisplay(menuWidth || 100, menuList);
		},
		[menuWidth, menuList],
	);



	const handleOptionsMenuOpen = useCallback(
		(event: React.MouseEvent<HTMLButtonElement>) => {
			setOptionAnchorEl(event.currentTarget);
		},
		[],
	);

	const handleOptionsMenuClose = useCallback(() => {
		setOptionAnchorEl(null);
	}, []);

	const handleClick = useCallback(
		(path: string) => {
			navigate(path);
			setOptionAnchorEl(null);
		},
		[navigate],
	);

	const mergedSx = useMemo(() => (sx ? { ...rootSx, ...sx } : rootSx), [sx]);

	return (
		<Stack id={uId} sx={mergedSx}>
			{displayList.map((item) => (
				<MenuButton
					key={item.name}
					path={item.path}
					isActive={isActive}
					menuItems={item?.children}
				>
					{item.name}
				</MenuButton>
			))}
			{ }
			{optionList.length > 0 ? (
				<IconButton
					aria-label="more options"
					color="primary"
					onClick={handleOptionsMenuOpen}
				>
					<Suspense fallback={<IconSkeleton />}>
						{" "}
						<MoreVertOutlined color="primary" />
					</Suspense>
				</IconButton>
			) : (
				<>
					<ThemeButton />
					<LoginButton />
				</>
			)}
			{optionAnchorEl && (
				<Menu
					anchorEl={optionAnchorEl}
					open={Boolean(optionAnchorEl)}
					onClose={handleOptionsMenuClose}
				>
					{optionList.length > 0 &&
						optionList.map((item) => (
							<MenuItemRenderer
								key={item.name}
								item={item}
								isActive={isActive}
								handleClick={handleClick}
							/>
						))}
					<ThemeButton expanded />
					<LoginButton expanded />
				</Menu>
			)}
		</Stack>
	);
};

export default DesktopMenu;
