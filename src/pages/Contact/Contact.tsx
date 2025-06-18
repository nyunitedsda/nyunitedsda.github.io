import { AlternateEmailOutlined, EmailOutlined } from "@mui/icons-material";
import LocationOnOutlined from "@mui/icons-material/LocationOnOutlined";
import PhoneOutlined from "@mui/icons-material/PhoneOutlined";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { SxProps, Theme } from "@mui/material/styles";
import type { FC } from "react";
import PageTitle from "../../components/PageWrapper/PageTitle";
import {
	CHURCH_NAME,
	CONTACT_PAGE_SUBTITLE,
	CONTACT_PAGE_TITLE,
	MAILING_ADDRESS_TITLE,
	contactInfo,
} from "../../constants/contact";
import NoteSection from "../Home/components/AnnouncementCard/NoteSection";
import ContactSection from "./components/ContactSection";
import MapDirection from "./components/MapDirection";
import ServiceTimes from "./components/ServiceTimes";

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
			<PageTitle title={CONTACT_PAGE_TITLE} subtitle={CONTACT_PAGE_SUBTITLE} />

			<Paper elevation={3} sx={contactDetailSx}>
				{/* address */}
				<ContactSection title={CHURCH_NAME}>
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
							href: `mailto:${contactInfo.email}`,
							content: contactInfo.email,
						},
					].map(({ id, ...rest }) => (
						<NoteSection {...rest} key={id} />
					))}
				</ContactSection>

				<ContactSection title={MAILING_ADDRESS_TITLE}>
					<NoteSection
						columnLayout
						content={contactInfo.mail_address}
						icon={<EmailOutlined color="primary" />}
						title={contactInfo.mail_recipient}
					/>
				</ContactSection>

				<ServiceTimes />
			</Paper>

			<MapDirection />
		</>
	);
};

export default Contact;
