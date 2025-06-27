import AddOutlined from "@mui/icons-material/AddOutlined";
import Button, { type ButtonProps } from "@mui/material/Button";
import type { FabProps } from "@mui/material/Fab";
import Fab from "@mui/material/Fab";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { SxProps, Theme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useMemo, type FC } from "react";
import type { PageTitleProps } from "./types";

const titleSx: SxProps<Theme> = {
	fontWeight: "bold",
	color: "primary.light",
	fontFamily: "inter",
};

const subtitleSx: SxProps<Theme> = {
	fontWeight: "bold",
	color: "text.primary",
};

const MOBILE_BUTTON_OFFSET = 18;

const PageTitle: FC<PageTitleProps> = ({
	subtitle,
	title,
	handleClick,
	icon,
}) => {
	const isMobile = useMediaQuery((theme: Theme) =>
		theme.breakpoints.down("sm"),
	);

	const buttonAttributes = useMemo(
		() => ({
			"aria-label": `Create new ${title}`,
			color: "primary",
			onClick: handleClick,
			...(isMobile
				? {
						children: icon ?? <AddOutlined />,
					}
				: {
						children: "Create",
						startIcon: icon ?? <AddOutlined />,
						variant: "contained",
					}),
		}),
		[handleClick, icon, title, isMobile],
	);

	return (
		<Stack direction="row" spacing={3} sx={{ pb: 2, alignItems: "center" }}>
			<Stack spacing={2} flexGrow={1}>
				<Typography variant="h3" component="h1" sx={titleSx}>
					{title}
				</Typography>
				{subtitle && (
					<Typography variant="h6" sx={subtitleSx}>
						{subtitle}
					</Typography>
				)}
			</Stack>
			{!isMobile && handleClick && (
				<Button {...(buttonAttributes as ButtonProps)} />
			)}
			{isMobile && handleClick && (
				<Fab
					{...({
						...buttonAttributes,
						sx: {
							position: "absolute",
							bottom: MOBILE_BUTTON_OFFSET,
							right: MOBILE_BUTTON_OFFSET,
						},
					} as FabProps)}
				/>
			)}
		</Stack>
	);
};

export default PageTitle;
