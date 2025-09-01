import {
	FooterContact,
	FooterSegment,
	FooterServiceTime,
	FooterSocial,
	getCopyright,
} from "@components/Footer";
import { YoutubeIcon } from "@components/Icons";
import { PageContentContainer } from "@components/PageWrapper";
import footer from "@constants/footer";
import { useMenuItems } from "@hooks/routes";
import { AlternateEmailOutlined, EmailOutlined } from "@mui/icons-material";
import Facebook from "@mui/icons-material/Facebook";
import Instagram from "@mui/icons-material/Instagram";
import Phone from "@mui/icons-material/Phone";
import Twitter from "@mui/icons-material/Twitter";
import type { SxProps, Theme } from "@mui/material";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import ListItem from "@mui/material/ListItem";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { FC, ReactNode } from "react";

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
	const { activeMenu } = useMenuItems();

	return (
		<Stack sx={footerSx}>
			<PageContentContainer>
				<Grid container spacing={{ xs: 0, md: 4 }}>
					{/* Social Media */}
					<FooterSocial iconMap={iconMap} />

					{/* Menu */}
					<FooterSegment sx={menuSx} title={footer.QUICK_LINKS}>
						{activeMenu.map((i) => (
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
					<FooterContact iconMap={iconMap} />
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
