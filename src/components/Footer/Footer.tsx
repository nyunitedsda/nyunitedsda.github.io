import {
	Email,
	Facebook,
	Instagram,
	Phone,
	Twitter,
	YouTube,
} from "@mui/icons-material";
import {
	Box,
	Container,
	Divider,
	Grid,
	IconButton,
	List,
	ListItem,
	Link as MuiLink,
	type SxProps,
	type Theme,
	Typography,
} from "@mui/material";
import { WEBSITE_TITLE } from "../../appConstants";
import contactInfo from "../../constants/contactInfo";
import navItems from "../../constants/navItems";
import services from "../../constants/services";
// import Link from "next/link"

const footerSx: SxProps<Theme> = {
	bgcolor: "primary.dark",
	color: "white",
	p: 2,
	width: "100%",
};

const SOCIAL_MEDIA = [
	{
		label: "Facebook",
		href: "https://facebook.com",
		icon: <Facebook />,
	},
	{
		label: "Instagram",
		href: "https://instagram.com",
		icon: <Instagram />,
	},
	{
		label: "Twitter",
		href: "https://twitter.com",
		icon: <Twitter />,
	},
	{
		label: "YouTube",
		href: "https://www.youtube.com/@newyorkunitedchurch3756",
		icon: <YouTube />,
	},
];

const MOTO = "A place of worship, community, and spiritual growth.";
export default function Footer() {
	return (
		<Box component="footer" sx={footerSx}>
			<Container maxWidth="lg">
				<Grid container spacing={4}>
					<Grid size={{ xs: 12, sm: 6, md: 3 }}>
						<Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
							{WEBSITE_TITLE}
						</Typography>
						<Typography variant="body2" sx={{ mb: 2 }}>
							{MOTO}
						</Typography>
						<Box sx={{ display: "flex", gap: 1 }}>
							{SOCIAL_MEDIA.map((i) => (
								<IconButton
									key={i.label}
									color="inherit"
									aria-label={i.label}
									component="a"
									href={i.href}
									target="_blank"
									title={i.label}
								>
									{i.icon}
								</IconButton>
							))}
						</Box>
					</Grid>

					<Grid size={{ xs: 12, sm: 6, md: 3 }}>
						<Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
							Quick Links
						</Typography>
						<List
							dense
							component="ul"
							sx={{
								listStyle: "none",
								p: 0,
								m: 0,
								"& a": { color: "inherit" },
							}}
						>
							{navItems.map((i) => (
								<ListItem
									component={"a"}
									href={i.path}
									key={i.name}
									sx={{ py: 0, fontSize: 14, mb: 1 }}
								>
									{i.name}
								</ListItem>
							))}
						</List>
					</Grid>

					{/* Services */}
					<Grid size={{ xs: 12, sm: 6, md: 3 }}>
						<Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
							Service Times
						</Typography>
						{services.map((i) => (
							<Typography key={i.title} variant="body2" sx={{ mb: 1 }}>
								<strong>{`${i.title}: `}</strong> {i.time}
							</Typography>
						))}
					</Grid>

					{/* Contacts */}
					<Grid size={{ xs: 12, sm: 6, md: 3 }}>
						<Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
							Contact Us
						</Typography>

						<Typography variant="body2" sx={{ mb: 1 }}>
							{contactInfo.street}
						</Typography>
						<Typography variant="body2" sx={{ mb: 1 }}>
							{`${contactInfo.city}, ${contactInfo.city}, ${contactInfo.country}`}
						</Typography>
						<Box
							color="inherit"
							component={"a"}
							href={`tel:${contactInfo.phone}`}
							sx={{ display: "flex", gap: 1, textDecoration: "none" }}
						>
							<Phone fontSize="small" />
							<Typography variant="body2" sx={{ mb: 1 }}>
								{contactInfo.phone}
							</Typography>
						</Box>
						<Box
							color="inherit"
							component={"a"}
							href={`mailto:${contactInfo.email}`}
							sx={{ display: "flex", gap: 1, textDecoration: "none" }}
						>
							<Email fontSize="small" />
							<Typography variant="body2" sx={{ mb: 1 }}>
								{contactInfo.email}
							</Typography>
						</Box>
					</Grid>
				</Grid>

				<Divider sx={{ my: 2, borderColor: "divider" }} />

				<Typography variant="body2" align="center">
					&copy; {new Date().getFullYear()} {WEBSITE_TITLE}. All rights
					reserved.
				</Typography>
			</Container>
		</Box>
	);
}
