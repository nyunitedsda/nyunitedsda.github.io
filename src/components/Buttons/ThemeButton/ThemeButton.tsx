import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { day } from "@components/Buttons";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import {
	type SxProps,
	type Theme,
	useColorScheme,
	useTheme,
} from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import {
	type FC,
	type MouseEvent,
	type TouchEvent,
	useCallback,
	useMemo,
} from "react";

const expandedBtnSx: SxProps<Theme> = {
	position: "relative",
	alignItems: "center",
	borderRadius: 16,
	cursor: "pointer",
	height: "100%",
	padding: "2px",
	transition: "background-color 0.3s ease",
	width: 120,
	border: (theme) => `2px inset ${theme.palette.divider}`,
	background: `center / 110%  no-repeat url('${day}')`,
};

const ThemeButton: FC<{ expanded?: boolean }> = ({ expanded = false }) => {
	const { mode, setMode } = useColorScheme();
	const theme = useTheme();

	const toggledMode = useMemo(
		() => (mode === "light" ? "dark" : "light"),
		[mode],
	);

	const _handleBtnClick = useCallback<
		(
			e:
				| MouseEvent<HTMLButtonElement>
				| TouchEvent<HTMLButtonElement>
				| MouseEvent<HTMLAnchorElement>
				| TouchEvent<HTMLAnchorElement>,
		) => void
	>(
		(e) => {
			e.stopPropagation();
			setMode(toggledMode);
		},
		[setMode, toggledMode],
	);

	if (!mode) {
		return null;
	}

	return (
		<>
			{expanded ? (
				<ListItem
					title={`Switch to ${toggledMode} mode`}
					sx={{ height: "48px" }}
				>
					<Button onClick={_handleBtnClick} sx={expandedBtnSx}>
						{mode === "dark" ? (
							<SunOutlined style={{ color: theme.palette.warning.light }} />
						) : (
							<MoonOutlined
								style={{
									color: theme.palette.primary.light,
								}}
							/>
						)}
					</Button>

					<Typography sx={{ ml: 2 }}>{"Theme"}</Typography>
				</ListItem>
			) : (
				<IconButton
					onClick={_handleBtnClick}
					title={`Switch to ${toggledMode} mode`}
				>
					{mode === "dark" ? (
						<SunOutlined style={{ color: theme.palette.warning.light }} />
					) : (
						<MoonOutlined
							style={{
								color: theme.palette.primary.light,
							}}
						/>
					)}
				</IconButton>
			)}
		</>
	);
};

export default ThemeButton;
