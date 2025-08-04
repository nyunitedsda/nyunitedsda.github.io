import SvgIcon, { type SvgIconProps } from "@mui/material/SvgIcon";
import type React from "react";

const IconSkeleton: React.FC<SvgIconProps> = (props) => (
	<SvgIcon {...props} viewBox="0 0 40 40">
		<rect x="8" y="8" width="24" height="24" rx="6" fill="#e0e0e0" />
		<rect x="14" y="14" width="12" height="12" rx="3" fill="#bdbdbd" />
	</SvgIcon>
);

export default IconSkeleton;
