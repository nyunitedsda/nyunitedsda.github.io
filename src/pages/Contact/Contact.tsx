import { AlternateEmailOutlined, EmailOutlined } from "@mui/icons-material";
import LocationOnOutlined from "@mui/icons-material/LocationOnOutlined";
import PhoneOutlined from "@mui/icons-material/PhoneOutlined";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { SxProps, Theme } from "@mui/material/styles";
import type { FC } from "react";
import PageTitle from "../../components/PageWrapper/PageTitle";
import contactInfo from "../../constants/contactInfo";
import NoteSection from "../Home/components/AnnouncementCard/NoteSection";
import ContactSection from "./components/ContactSection";
import MapDirection from "./components/MapDirection";
import ServiceTimes from "./components/ServiceTimes";
import { COMPANY, HEADER, MAILING_ADDRESS_TITLE, SUBHEADER } from "./constants";

const contactDetailSx: SxProps<Theme> = {
	display: "flex",
	flexDirection: "column",
	gap: 2,
	p: 3,
	my: 2,
	"& svg": {
		fontSize: 22,
	},
};

const Contact: FC = () => {
	return (
		<>
			<PageTitle title={HEADER} subtitle={SUBHEADER} />
			{/* <ContactForm /> */}

			<Paper elevation={3} sx={contactDetailSx}>
				{/* address */}
				<ContactSection title={COMPANY}>
					<Stack direction="row" gap={2}>
						<Stack justifyContent="center">
							<LocationOnOutlined color="primary" />
						</Stack>
						<Stack>
							<Typography variant="body1">{contactInfo.street}</Typography>
							<Typography variant="body1">
								{`${contactInfo.city}, ${contactInfo.zipCode}, ${contactInfo.country}`}
							</Typography>
						</Stack>
					</Stack>
					{[
						{
							id: 2,
							icon: <PhoneOutlined />,
							component: "a",
							href: `tel:${contactInfo.phone}`,
							content: contactInfo.phone,
						},
						{
							id: 3,
							icon: <AlternateEmailOutlined />,
							component: "a",
							href: `tel:${contactInfo.email}`,
							content: contactInfo.email,
						},
					].map(({ id, ...rest }) => (
						<NoteSection {...rest} key={id} />
					))}
				</ContactSection>

				<ContactSection title={MAILING_ADDRESS_TITLE}>
					<NoteSection
						content={contactInfo.mailingAddress}
						icon={<EmailOutlined color="primary" />}
					/>
				</ContactSection>

				<ServiceTimes />
			</Paper>

			<MapDirection />
		</>
	);
};

export default Contact;
