import {
	type NotificationBannerProps,
	selectSeverityIcon,
} from "@components/NotificationBanner";
import { NotificationContext } from "@contexts/NotificationContext";
import { useEntityList } from "@hooks/api";
import CloseOutlined from "@mui/icons-material/CloseOutlined";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import type { Palette, PaletteColor, Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import type { SystemStyleObject } from "@mui/system";
import { type FC, useCallback, useContext, useMemo, useState } from "react";
import type { SeverityDT, SeverityPalette } from "@/api";

const rootSx = ({
	severColor = "info",
	theme,
}: {
	theme: Theme;
	severColor: keyof Palette;
}): SystemStyleObject<Theme> => ({
	width: "100%",
	height: "auto",
	"& .MuiCollapse-wrapperInner": {
		width: "100%",
		display: "flex",
		alignItems: "center",
		flexDirection: "row",
		flexWrap: "nowrap",
		backgroundColor: (theme) =>
			(theme.palette[severColor] as PaletteColor).light,
		color: (theme.palette[severColor] as PaletteColor).contrastText,
		px: 2,
		py: 0.5,
		gap: 2,
	},
});

const NotificationBanner: FC<NotificationBannerProps> = (props) => {
	const { id, message, open, severity_id, title } = props;
	const { dismissNotification } = useContext(NotificationContext);
	const { data, isLoading } = useEntityList<SeverityDT>("severity");

	const [isVisible, setIsVisible] = useState<boolean>(open ?? false);

	const { icon, severColor } = useMemo(() => {
		const severity = data?.find((i) => i.id === severity_id) ?? {};
		return {
			icon: selectSeverityIcon(severity.color as SeverityPalette),
			severColor: (severity.color ?? "info") as keyof Palette,
		};
	}, [data, severity_id]);

	const _handleClose = useCallback(() => {
		setIsVisible(false);
		dismissNotification(id);
	}, [id, dismissNotification]);

	return (
		<>
			{isVisible && !isLoading && (
				<Stack
					direction={"row"}
					spacing={1}
					sx={{
						width: "100%",
					}}
				>
					<Collapse
						component="div"
						in={isVisible}
						sx={[(theme: Theme) => rootSx({ severColor, theme })]}
					>
						<Stack sx={{ maxWidth: 32 }}>{icon}</Stack>

						<Stack sx={{ flexGrow: 1 }}>
							{title && (
								<Typography fontWeight="bold" variant="subtitle1">
									{title}
								</Typography>
							)}
							<Typography variant="subtitle2">{message}</Typography>
						</Stack>

						<IconButton
							size="small"
							aria-label="close"
							color="inherit"
							onClick={_handleClose}
						>
							<CloseOutlined />
						</IconButton>
					</Collapse>
				</Stack>
			)}
		</>
	);
};

export default NotificationBanner;
