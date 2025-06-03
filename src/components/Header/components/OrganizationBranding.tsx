import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { type FC, useMemo } from "react";
import logo from "../../../assets/img/NY United Logo small.png";
import useFormattedRoutes from "../../../hooks/routes/useFormattedRoutes";
import { brandingStyles } from "../styles";

export interface OrganizationBrandingProps {
	isLogoVisible?: boolean;
}

const { brandingSx, rootSx, logoSx } = brandingStyles;

const WEBSITE_TITLE =
	import.meta.env.VITE_WEBSITE_TITLE || "NY United SDA Church";
const LOGO_ALT = `An Arch containing 3 trumpets above a city, located above ${WEBSITE_TITLE}`;
const HOME = "Home";

const OrganizationBranding: FC<OrganizationBrandingProps> = ({
	isLogoVisible = true,
}) => {
	const { menuItems } = useFormattedRoutes();

	const { path } = useMemo(() => {
		return menuItems.filter((i) => i.name === HOME)[0];
	}, [menuItems]);

	return (
		<Box sx={rootSx}>
			{isLogoVisible && (
				<Box sx={logoSx}>
					<img src={logo} alt={LOGO_ALT} height={38} />
				</Box>
			)}

			<Typography variant="h5" component={"a"} href={path} sx={brandingSx}>
				{WEBSITE_TITLE}
			</Typography>
		</Box>
	);
};

export default OrganizationBranding;
