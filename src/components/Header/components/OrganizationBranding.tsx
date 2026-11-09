import { routePaths } from "@hooks/routes";
import type { SxProps, Theme } from "@mui/material/styles";
import { Flex, Typography, theme } from "antd";
import { type FC, useContext } from "react";
import { Link } from "react-router";
import { darkLogo, smallLogo } from "@/assets";
import context from "@/contexts/ThemeContext/context";
import { LOGO_ALT, WEBSITE_TITLE } from "./constants";

export interface OrganizationBrandingProps {
	isLogoVisible?: boolean;
	isVisibleBrand?: boolean;
	sx?: SxProps<Theme>;
}

const OrganizationBranding: FC<OrganizationBrandingProps> = ({
	isLogoVisible = true,
	isVisibleBrand = true,
}) => {
	const { mode } = useContext(context);
	const { token } = theme.useToken();
	return (
		<Flex align="center" gap={10}>
			{isLogoVisible && (
				<Flex>
					<img
						src={mode === "dark" ? darkLogo : smallLogo}
						alt={LOGO_ALT}
						height={38}
					/>
				</Flex>
			)}
			{isVisibleBrand && (
				<Typography.Title
					level={3}
					style={{
						color: token.colorPrimary,
						flexGrow: 1,
						fontFamily: "Inter",
						fontWeight: 700,
						textDecoration: "none",
						margin: 0,
					}}
				>
					<Link to={routePaths.HOME} style={{ color: token.colorPrimary }}>
						{WEBSITE_TITLE}
					</Link>
				</Typography.Title>
			)}
		</Flex>
	);
};

export default OrganizationBranding;
