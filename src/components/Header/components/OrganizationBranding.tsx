import { brandingStyles } from "@components/Header";
import { routePaths } from "@hooks/routes";
import { useColorTheme } from "@hooks/theme";
import Box from "@mui/material/Box";
import type { SxProps, Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import type { FC } from "react";
import { darkLogo, smallLogo } from "@/assets";

export interface OrganizationBrandingProps {
	isLogoVisible?: boolean;
	isVisibleBrand?: boolean;
	sx?: SxProps<Theme>;
}

const WEBSITE_TITLE =
	import.meta.env.VITE_WEBSITE_TITLE || "NY United SDA Church";
export const LOGO_ALT = `An Arch containing 3 trumpets above a city, located above ${WEBSITE_TITLE}`;

const OrganizationBranding: FC<OrganizationBrandingProps> = ({
	isLogoVisible = true,
	isVisibleBrand = true,
	sx,
}) => {
	const { mode } = useColorTheme();
	return (
		<Box sx={[brandingStyles.rootSx, ...(sx && Array.isArray(sx) ? sx : [sx])]}>
			{isLogoVisible && (
				<Box sx={brandingStyles.logoSx}>
					<img
						src={mode === "dark" ? darkLogo : smallLogo}
						alt={LOGO_ALT}
						height={38}
					/>
				</Box>
			)}
			{isVisibleBrand && (<Typography
				variant="h5"
				component={"a"}
				href={routePaths.HOME}
				sx={brandingStyles.brandingSx}
			>
				{WEBSITE_TITLE}
			</Typography>)}
		</Box>
	);
};

export default OrganizationBranding;
