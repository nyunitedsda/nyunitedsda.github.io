import { Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import type { FC } from "react";
import PageTitle from "../../components/PageWrapper/PageTitle";
import ContactSection from "../Contact/components/ContactSection";
import ServiceTimes from "../Contact/components/ServiceTimes";
import {
	HEADER,
	SUBHEADER,
	aboutContent,
	details,
	organization,
	organizationContent,
} from "./constants";

const AboutUs: FC = () => {
	return (
		<>
			<PageTitle title={HEADER} subtitle={SUBHEADER} />
			<Stack spacing={2} className="fade-in" sx={{}}>
				{aboutContent.map((i) => (
					<Typography variant="body1" color="text.primary" key={i}>
						{i}
					</Typography>
				))}

				<ContactSection title={organization}>
					<Typography
						variant="body1"
						sx={{
							"& strong": { color: "text.secondary" },
							color: "text.primary",
						}}
						dangerouslySetInnerHTML={{ __html: organizationContent }}
					/>
				</ContactSection>

				{details.map((i) => (
					<ContactSection key={i.title} title={i.title}>
						<Typography variant="body1" color="text.primary">
							{i.content}
						</Typography>
					</ContactSection>
				))}

				<ServiceTimes />
			</Stack>
		</>
	);
};

export default AboutUs;
