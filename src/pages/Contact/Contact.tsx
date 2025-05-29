import { Email, LocationOn, Phone } from "@mui/icons-material";
import { Box, Grid, List, ListItem, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import type { FC } from "react";
import ContactForm from "../../components/ContactForm/ContactForm";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import contactInfo from "../../constants/contactInfo";
import services from "../../constants/services";

const HEADER = "Contact Us";
const SUBHEADER = "How to get in touch with New York United church";
const METRO = "Metro & Bus";
const TRIP_PLANNER = "Trip Planner";
const DRIVING_DIRECTION = "​DRIVING DIRECTIONS";
const LENOX_AVE =
	"Coming from Lenox Ave, if you reach 5th Ave, you've gone too far!";
const BRIDGE =
	"Coming from Brooklyn Bridge, If you reach W 130th St you've gone a little too far. 163 W 131ST ST is on the right. If you reach Adam Clayton Powell Jr Blvd you've gone a little too far";
const COMPANY = "New York United Sabbath Day Adventist Church, Inc.";
const SERVICES = "Services";

const Contact: FC = () => {
	return (
		<PageWrapper header={HEADER} subHeader={SUBHEADER}>
			<ContactForm />

			<Paper elevation={3} sx={{ p: 4, mb: 2, mt: 4 }}>
				<Typography
					variant="h5"
					sx={{ mb: 4, color: "primary.light", fontWeight: "bold" }}
				>
					{COMPANY}
				</Typography>

				<Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
					<LocationOn color="primary" sx={{ mr: 2, fontSize: 24 }} />
					<Box>
						{/* <Typography variant="h6">Address</Typography> */}
						<Typography variant="body1" sx={{ mb: 1 }}>
							{contactInfo.street}
						</Typography>
						<Typography variant="body1" sx={{ mb: 1 }}>
							{`${contactInfo.city}, ${contactInfo.zipCode}, ${contactInfo.country}`}
						</Typography>
						{/* <Button
              variant="text"
              color="primary"
              href="https://maps.google.com/?q=123+Faith+Avenue,+Blessed+City,+BC+12345"
              target="_blank"
              sx={{ pl: 0, mt: 0.5 }}
            >
              Get Directions
            </Button> */}
					</Box>
				</Box>

				<Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
					<Phone color="primary" sx={{ mr: 2, fontSize: 24 }} />
					<Box>
						{/* <Typography variant="h6">Phone</Typography> */}
						<Typography variant="body1">{contactInfo.phone}</Typography>
					</Box>
				</Box>

				<Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
					<Email color="primary" sx={{ mr: 2, fontSize: 24 }} />
					<Box>
						{/* <Typography variant="h6">Email</Typography> */}
						<Typography variant="body1">{contactInfo.email}</Typography>
					</Box>
				</Box>

				<Box sx={{ display: "flex", alignItems: "center" }}>
					{/* Services */}
					<Grid size={{ xs: 12, sm: 6, md: 3 }}>
						<Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
							{SERVICES}
						</Typography>
						{services.map((i) => (
							<Typography key={i.title} variant="body1" sx={{ mb: 1 }}>
								<strong>{`${i.title}: `}</strong> {i.time}
							</Typography>
						))}
					</Grid>
				</Box>
			</Paper>

			<Paper
				elevation={3}
				sx={{
					p: 2,
					minHeight: "450px",
					overflow: "hidden",
					display: "flex",
					flexDirection: { xs: "column", md: "row" },
					gap: 2,
					mt: 2,
				}}
			>
				<Box sx={{ width: { xs: "100%", md: "50%" } }}>
					<iframe
						src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6039.397082262674!2d-73.9473282235637!3d40.812617831449124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2f673ca97d269%3A0xb0125493deeebd8b!2sNY%20United%20SDA%20Church!5e0!3m2!1sen!2sca!4v1747803640476!5m2!1sen!2sca"
						height="450"
						style={{ borderRadius: 4, width: "100%", maxWidth: "600px" }}
						allowFullScreen
						referrerPolicy="no-referrer-when-downgrade"
						title="Google Maps Location"
					></iframe>
				</Box>

				<Stack
					sx={{
						p: 2,
						height: { xs: "auto", md: "100%" },
						gap: 2,
						width: { xs: "100%", md: "50%" },
					}}
				>
					<Stack>
						<Typography variant="h6" fontWeight={"bold"}>
							{METRO}
						</Typography>
						<Typography
							component={"a"}
							sx={{ textDecoration: "none", color: "primary.light" }}
							href="http://www.mta.info/nyct"
						>
							{TRIP_PLANNER}
						</Typography>
					</Stack>
					<Stack sx={{ width: "100%" }}>
						<Typography variant="h6" fontWeight={"bold"}>
							{DRIVING_DIRECTION}
						</Typography>
						<List>
							<ListItem>{LENOX_AVE}</ListItem>
							<ListItem>{BRIDGE}</ListItem>
						</List>
					</Stack>
				</Stack>
			</Paper>
		</PageWrapper>
	);
};

export default Contact;
