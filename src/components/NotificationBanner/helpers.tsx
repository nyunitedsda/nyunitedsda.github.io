import { lazy, type ReactNode } from "react";
import type { SeverityPalette } from "@/api";

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

const severityIcons: Record<SeverityPalette, ReactNode> = {
	info: <InfoOutlineRounded sx={{ color: "info.contrastText" }} />,
	warning: <WarningOutlined sx={{ color: "warning.contrastText" }} />,
	error: <ErrorOutlineOutlined sx={{ color: "error.contrastText" }} />,
	success: (
		<CheckCircleOutlineOutlined sx={{ color: "success.contrastText" }} />
	),
};

const selectSeverityIcon = (severity: SeverityPalette = "info") =>
	severityIcons[severity] ?? severityIcons.info;

export { selectSeverityIcon };
