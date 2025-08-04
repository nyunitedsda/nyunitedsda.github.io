import { AlternateEmailOutlined, EmailOutlined } from "@mui/icons-material";
import LocationOnOutlined from "@mui/icons-material/LocationOnOutlined";
import PhoneOutlined from "@mui/icons-material/PhoneOutlined";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import type { SxProps, Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useQuery } from "@tanstack/react-query";
import type { FC } from "react";
import { getDefaultContacts } from "../../api/request/contactsRequest";
import PageTitle from "../../components/PageWrapper/PageTitle";
import NoteSection from "../Home/components/AnnouncementCard/NoteSection";
import ContactSection from "./components/ContactSection";
import { CONTACT_CONSTANT } from "./components/contact";
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

const { PAGE_TITLE, PAGE_SUBTITLE, MAILING_ADDRESS_TITLE } = CONTACT_CONSTANT;

const Contact: FC = () => {
	const { data, isLoading, error } = useQuery({
		queryKey: ["contactInfo"],
		queryFn: async () => getDefaultContacts(),
	});

	return (
		<>
			<PageTitle title={PAGE_TITLE} subtitle={PAGE_SUBTITLE} />

			<Paper elevation={3} sx={contactDetailSx}>
				{/* address */}
				{!isLoading && !error && (
					<>
						<ContactSection title={data?.contact_name}>
							<Stack direction="row" gap={2}>
								<Stack justifyContent="center">
									<LocationOnOutlined color="primary" />
								</Stack>
								<Stack>
									<Typography variant="body1">{data.street}</Typography>
									<Typography variant="body1">
										{`${data.city}, ${data.zipCode}, ${data.country}`}
									</Typography>
								</Stack>
							</Stack>
							{[
								{
									id: 2,
									icon: <PhoneOutlined />,
									component: "a",
									href: `tel:${data.phone}`,
									content: data.phone,
								},
								{
									id: 3,
									icon: <AlternateEmailOutlined />,
									component: "a",
									href: `mailto:${data.email}`,
									content: data.email,
								},
							].map(({ id, ...rest }) => (
								<NoteSection {...rest} key={id} />
							))}
						</ContactSection>

						<ContactSection title={MAILING_ADDRESS_TITLE}>
							<NoteSection
								columnLayout
								content={data.mail_address}
								icon={<EmailOutlined color="primary" />}
								title={data.mailing_recipient}
							/>
						</ContactSection>
					</>
				)}

				<ServiceTimes />
			</Paper>

			<MapDirection />
		</>
	);
};

export default Contact;
