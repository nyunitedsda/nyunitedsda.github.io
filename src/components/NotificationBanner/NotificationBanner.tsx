import CloseOutlined from "@mui/icons-material/CloseOutlined";
import type { Theme } from "@mui/material/styles";

import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { SystemStyleObject } from "@mui/system";
import { type FC, useCallback, useContext, useState } from "react";
import NotificationContext from "../../contexts/NotificationContext/context";
import { selectSeverityIcon } from "./components/helpers";
import type { NotificationProps, NotificationSeverity } from "./types";

export type NotificationBannerProps = NotificationProps & {};

const severityColors: Record<
	NotificationSeverity,
	"info" | "warning" | "error" | "success"
> = {
	information: "info",
	caution: "warning",
	error: "error",
	success: "success",
};

const rootSx = ({
	severity = "information",
	theme,
}: {
	theme: Theme;
	severity: NotificationProps["severity"];
}): SystemStyleObject<Theme> => ({
	width: "100%",
	height: "auto",
	"& .MuiCollapse-wrapperInner": {
		width: "100%",
		display: "flex",
		alignItems: "center",
		flexDirection: "row",
		flexWrap: "nowrap",
		backgroundColor: (theme) => theme.palette[severityColors[severity]].light,
		color: theme.palette[severityColors[severity]].contrastText,
		px: 2,
		py: 0.5,
		gap: 2,
	},
});

const NotificationBanner: FC<NotificationBannerProps> = (props) => {
	const { id, message, open, severity, title } = props;
	const { dismissNotification } = useContext(NotificationContext);

	const [isVisible, setIsVisible] = useState<boolean>(open ?? false);

	const _handleClose = useCallback(() => {
		setIsVisible(false);
		dismissNotification(id);
	}, []);

	return (
		<>
			{isVisible && (
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
						sx={[(theme: Theme) => rootSx({ severity, theme })]}
					>
						<Stack sx={{ maxWidth: 32 }}>{selectSeverityIcon(severity)}</Stack>

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
