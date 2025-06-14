import {
	Email,
	EmailOutlined,
	LocationOn,
	LocationOnOutlined,
	Phone,
	PhoneOutlined,
} from "@mui/icons-material";
import { Box, Grid, Stack, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import type { FC } from "react";
import PageTitle from "../../components/PageWrapper/PageTitle";
import contactInfo from "../../constants/contactInfo";
import services from "../../constants/services";
import NoteSection from "../Home/components/NotificationCard/NoteSection";
import MapDirection from "./components/MapDirection";
import { COMPANY, HEADER, SERVICES, SUBHEADER } from "./constants";

const Contact: FC = () => {
	return (
		<>
			<PageTitle title={HEADER} subtitle={SUBHEADER} />
			{/* <ContactForm /> */}

			<Paper elevation={3} sx={{ p: 4, mb: 2, mt: 4 }}>
				<Typography
					variant="h5"
					sx={{ mb: 4, color: "primary.light", fontWeight: "bold" }}
				>
					{COMPANY}
				</Typography>

				{/* address */}
				<Stack sx={{ mb: 2, gap: 1 }}>
					{[
						{
							icon: <LocationOnOutlined />,
							content: (
								<>
									<Typography variant="body1">{contactInfo.street}</Typography>
									<Typography variant="body1">
										{`${contactInfo.city}, ${contactInfo.zipCode}, ${contactInfo.country}`}
									</Typography>
								</>
							),
						},
						{
							icon: <PhoneOutlined />,
							content: contactInfo.phone,
						},
						{
							icon: <EmailOutlined />,
							content: contactInfo.email,
						},
					].map((i) => (
						<NoteSection {...i} key={i?.content?.toString()} />
					))}

					{/* <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
						<LocationOn color="primary" sx={{ mr: 2, fontSize: 24 }} />
						<Box>
							<Typography variant="body1" sx={{ mb: 1 }}>
								{contactInfo.street}
							</Typography>
							<Typography variant="body1" sx={{ mb: 1 }}>
								{`${contactInfo.city}, ${contactInfo.zipCode}, ${contactInfo.country}`}
							</Typography>
						</Box>
					</Box> */}

					{/* <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
						<Phone color="primary" sx={{ mr: 2, fontSize: 24 }} />
						<Box>
							<Typography variant="body1">{contactInfo.phone}</Typography>
						</Box>
					</Box>

					<NoteSection content={contactInfo.email} icon={<Email />} title="" /> */}
				</Stack>

				{/* <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
					<Email color="primary" sx={{ mr: 2, fontSize: 24 }} />
					<Box>
						<Typography variant="body1">{contactInfo.email}</Typography>
					</Box>
				</Box> */}

				<Box sx={{ display: "flex", flexDirection: "column", mb: 3 }}>
					<Typography
						variant="h5"
						sx={{ fontWeight: "bold", mb: 2, color: "primary.light" }}
					>
						{"Mailing Address"}
					</Typography>
					<Typography variant="body1">{contactInfo.mailingAddress}</Typography>
				</Box>

				<Box sx={{ display: "flex", alignItems: "center" }}>
					{/* Services */}
					<Grid size={{ xs: 12, sm: 6, md: 3 }}>
						<Typography
							variant="h5"
							sx={{ fontWeight: "bold", mb: 2, color: "primary.light" }}
						>
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

			<MapDirection />
		</>
	);
};

export default Contact;
