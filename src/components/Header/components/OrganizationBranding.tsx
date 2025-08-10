import { routePaths } from "@hooks/routes";
import Box from "@mui/material/Box";
import type { SxProps, Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import type { FC } from "react";
import { smallLogo } from "@/assets";
import { brandingStyles } from "../styles";

export interface OrganizationBrandingProps {
	isLogoVisible?: boolean;
	sx?: SxProps<Theme>;
}

const { brandingSx, rootSx, logoSx } = brandingStyles;

const WEBSITE_TITLE =
	import.meta.env.VITE_WEBSITE_TITLE || "NY United SDA Church";
const LOGO_ALT = `An Arch containing 3 trumpets above a city, located above ${WEBSITE_TITLE}`;

const OrganizationBranding: FC<OrganizationBrandingProps> = ({
	isLogoVisible = true,
	sx,
}) => {
	return (
		<Box sx={[rootSx, ...(sx && Array.isArray(sx) ? sx : [sx])]}>
			{isLogoVisible && (
				<Box sx={logoSx}>
					<img src={smallLogo} alt={LOGO_ALT} height={38} />
				</Box>
			)}
			<Typography
				variant="h5"
				component={"a"}
				href={routePaths.HOME}
				sx={brandingSx}
			>
				{WEBSITE_TITLE}
			</Typography>
		</Box>
	);
};

export default OrganizationBranding;
