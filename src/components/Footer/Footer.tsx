import { AlternateEmailOutlined, EmailOutlined } from "@mui/icons-material";
import Facebook from "@mui/icons-material/Facebook";
import Instagram from "@mui/icons-material/Instagram";
import Phone from "@mui/icons-material/Phone";
import Twitter from "@mui/icons-material/Twitter";
import { type SxProps, type Theme } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useQuery } from "@tanstack/react-query";
import { useMemo, type FC, type ReactNode } from "react";
import { getDefaultContacts } from "../../api/request/contactsRequest";
import {
	MOTTO,
	QUICK_LINKS,
	socialMediaInfo,
	WEBSITE_TITLE,
} from "../../constants/footer";
import useFormattedRoutes from "../../hooks/routes/useFormattedRoutes";
import { CONTACT_CONSTANT } from "../../pages/Contact/components/contact";
import NoteSection from "../../pages/Home/components/AnnouncementCard/NoteSection";
import PageContentContainer from "../PageWrapper/PageContentContainer";
import FooterSegment from "./components/FooterSegment";
import FooterServiceTime from "./components/FooterServiceTime";
import { FOOTER_LEGAL_LINKS } from "./constants";
import { formatFooterContactData, getCopyright } from "./helpers";

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
	"& .MuiContainer-root": {
		p: { xs: 0, md: 2 },
	},
	"& .MuiIconButton-root": {
		"& img": {
			width: 32,
			height: 32,
			fill: "red !important",
			strokeWidth: 4,
		},
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

const strokeWidth = 12;

const YoutubeIcon = () => (
	<svg
		height="24"
		width="32"
		viewBox="0 0 200 140"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		style={{ display: "inline-block", verticalAlign: "middle", height: 24 }}
	>
		{/* YouTube rounded rectangle outline */}
		<rect
			x="12"
			y="22"
			width="176"
			height="96"
			rx="18"
			ry="18"
			fill="none"
			stroke="#FF0000"
			strokeWidth={strokeWidth}
		/>
		{/* Play button triangle outline */}
		<path
			d="M75 45L75 95L125 70L75 45Z"
			fill="none"
			stroke="#FF0000"
			strokeWidth={strokeWidth}
			strokeLinejoin="round"
		/>
	</svg>
);

const iconMap: Record<string, ReactNode> = {
	Facebook: <Facebook />,
	Instagram: <Instagram />,
	Twitter: <Twitter />,
	YouTube: <YoutubeIcon />,
	Phone: <Phone fontSize="small" />,
	Email: <AlternateEmailOutlined fontSize="small" />,
	Mail: <EmailOutlined fontSize="small" />,
};

const Footer: FC = () => {
	const { menuItems } = useFormattedRoutes();
	const { data, isLoading, error } = useQuery({
		queryKey: ["contactInfo"],
		queryFn: async () => getDefaultContacts(),
	});

	const contactData = useMemo(() => {
		return data ? formatFooterContactData(data) : [];
	}, [data]);

	return (
		<Stack sx={footerSx}>
			<PageContentContainer>
				<Grid container spacing={{ xs: 0, md: 4 }}>
					{/* Social Media */}
					<FooterSegment title={WEBSITE_TITLE} subtitle={MOTTO.text}>
						<>
							{FOOTER_LEGAL_LINKS.map((i) => (
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
					<FooterServiceTime />

					{/* Contacts */}
					<FooterSegment title={CONTACT_CONSTANT.CONTACT_US}>
						{!isLoading &&
							!error &&
							contactData.map((i) => (
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
