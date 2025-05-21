import {
	Email,
	Phone,
} from "@mui/icons-material";
import {
	Box,
	Container,
	Divider,
	Grid,
	IconButton,
	List,
	ListItem,
	type SxProps,
	type Theme,
	Typography,
} from "@mui/material";
import type { FC } from "react";
import { WEBSITE_TITLE } from "../../appConstants";
import contactInfo from "../../constants/contactInfo";
import navItems from "../../constants/navItems";
import services from "../../constants/services";
import socialMediaInfo from "./socialMediaInfo";

const footerSx: SxProps<Theme> = {
	bgcolor: "primary.dark",
	color: "white",
	p: 2,
	width: "100%",
};

const listSx: SxProps<Theme> = {
	listStyle: "none",
	p: 0,
	m: 0,
	"& a": { color: "inherit" },
}

const MOTTO = "A place of worship, community, and spiritual growth.";
const QUICK_LINKS = 'Quick Links'
const SERVICE_TIMES = 'Service Times'
const CONTACT_US = 'Contact Us'

const Footer: FC = () => {

	return (
		<Box component="footer" sx={footerSx}>
			<Container maxWidth="lg">
				<Grid container spacing={4}>
					<Grid size={{ xs: 12, sm: 6, md: 3 }}>
						<Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
							{WEBSITE_TITLE}
						</Typography>
						<Typography variant="body2" sx={{ mb: 2 }}>
							{MOTTO}
						</Typography>
						<Box sx={{ display: "flex", gap: 1 }}>
							{socialMediaInfo.map((i) => (
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
							{QUICK_LINKS}
						</Typography>
						<List
							dense
							component="ul"
							sx={listSx}
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
							{SERVICE_TIMES}
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
							{CONTACT_US}
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

export default Footer