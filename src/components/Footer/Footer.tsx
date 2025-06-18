import { AlternateEmailOutlined, EmailOutlined } from "@mui/icons-material";
import Facebook from "@mui/icons-material/Facebook";
import Instagram from "@mui/icons-material/Instagram";
import Phone from "@mui/icons-material/Phone";
import Twitter from "@mui/icons-material/Twitter";
import YouTube from "@mui/icons-material/YouTube";
import type { SxProps, Theme } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { type FC, type ReactNode, useMemo } from "react";
import { CONTACT_DATA, CONTACT_US } from "../../constants/contact";
import {
	MOTTO,
	QUICK_LINKS,
	WEBSITE_TITLE,
	socialMediaInfo,
} from "../../constants/footer";
import services, { SERVICES } from "../../constants/services";
import useFormattedRoutes from "../../hooks/routes/useFormattedRoutes";
import NoteSection from "../../pages/Home/components/AnnouncementCard/NoteSection";
import { LEGAL_TAB_LIST } from "../../pages/UserAgreements/constants";
import PageContentContainer from "../PageWrapper/PageContentContainer";
import { mapRoutesToTabs } from "../RoutedTabs/helpers";
import FooterSegment from "./components/FooterSegment";
import { getCopyright } from "./helpers";

const footerSx: SxProps<Theme> = {
	bgcolor: "primary.main",
	color: "primary.contrastText !important",
	"& *": {
		color: (theme) => `${theme.palette.primary.contrastText} !important`,
	},
	p: 2,
	width: "100%",
	"& a": {
		textDecoration: "none",
		color: "primary.contrastText",
	},
};

const menuSx: SxProps<Theme> = {
	"& a": {
		color: "inherit",
	},
};

const dividerSx: SxProps<Theme> = {
	my: 2,
	backgroundColor: (theme) => `${theme.palette.divider}`,
};

const iconMap: Record<string, ReactNode> = {
	Facebook: <Facebook />,
	Instagram: <Instagram />,
	Twitter: <Twitter />,
	YouTube: <YouTube />,
	Phone: <Phone fontSize="small" />,
	Email: <AlternateEmailOutlined fontSize="small" />,
	Mail: <EmailOutlined fontSize="small" />,
};

const Footer: FC = () => {
	const { routes, menuItems } = useFormattedRoutes();

	const TERMS_AND_POLICIES = useMemo(() => {
		return mapRoutesToTabs(routes, LEGAL_TAB_LIST);
	}, []);

	return (
		<Stack sx={footerSx}>
			<PageContentContainer>
				<Grid container spacing={4}>
					{/* Social Media */}
					<FooterSegment title={WEBSITE_TITLE} subtitle={MOTTO.text}>
						<>
							{TERMS_AND_POLICIES.map((i) => (
								<Typography
									component="a"
									href={i.href}
									key={i.label}
									target="_self"
									variant="body2"
								>
									{i.label}
								</Typography>
							))}

							<Box display="flex" gap={1}>
								{socialMediaInfo.map((i) => (
									<IconButton
										aria-label={i.label}
										component="a"
										disabled={i.disabled}
										href={i.href}
										key={i.label}
										size="small"
										sx={{
											"& .MuiSvgIcon-root": {
												...(i.icon === "YouTube"
													? { fill: "red !important" }
													: {}),
											},
										}}
										target="__blank"
										title={i.label}
									>
										{iconMap[i.icon]}
									</IconButton>
								))}
							</Box>
						</>
					</FooterSegment>

					{/* Menu */}
					<FooterSegment sx={menuSx} title={QUICK_LINKS}>
						{menuItems.map((i) => (
							<ListItem
								component={"a"}
								href={i.path}
								key={i.name}
								disablePadding
							>
								{i.name}
							</ListItem>
						))}
					</FooterSegment>

					{/* Services */}
					<FooterSegment title={SERVICES}>
						{services.map((i) => (
							<Typography key={i.title} variant="body2">
								<strong>{`${i.title}: `}</strong> {i.time}
							</Typography>
						))}
					</FooterSegment>

					{/* Contacts */}
					<FooterSegment title={CONTACT_US}>
						{CONTACT_DATA.map((i) => (
							<NoteSection
								{...i}
								columnLayout
								title={i.title}
								icon={i?.icon ? iconMap[i.icon] : undefined}
								key={i.content}
							/>
						))}
					</FooterSegment>
				</Grid>

				<Divider sx={dividerSx} />

				<Typography variant="body2" align="center">
					&copy; {getCopyright()}
				</Typography>
			</PageContentContainer>
		</Stack>
	);
};

export default Footer;
