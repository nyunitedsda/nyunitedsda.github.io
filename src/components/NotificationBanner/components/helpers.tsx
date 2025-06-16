import { type ReactNode, lazy } from "react";
import type { NotificationProps, NotificationSeverity } from "../types";

const InfoOutlineRounded = lazy(
	() => import("@mui/icons-material/InfoOutlineRounded"),
);
const WarningOutlined = lazy(
	() => import("@mui/icons-material/WarningOutlined"),
);
const ErrorOutlineOutlined = lazy(
	() => import("@mui/icons-material/ErrorOutlineOutlined"),
);
const CheckCircleOutlineOutlined = lazy(
	() => import("@mui/icons-material/CheckCircleOutlineOutlined"),
);

const severityIcons: Record<NotificationSeverity, ReactNode> = {
	info: <InfoOutlineRounded sx={{ color:"info.contrastText" }}/>,
	warning: <WarningOutlined sx={{ color:"warning.contrastText" }}/>,
	error: <ErrorOutlineOutlined sx={{ color:"error.contrastText" }}/>,
	success: <CheckCircleOutlineOutlined sx={{ color:"success.contrastText" }}/>,
};

const selectSeverityIcon = (severity: NotificationProps["severity"] = "info") =>
	severityIcons[severity];

export { selectSeverityIcon };
