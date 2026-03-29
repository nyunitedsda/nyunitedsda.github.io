import { PageTitle } from "@components/PageWrapper";
import { Stack, type SxProps, type Theme } from "@mui/material";
import Typography from "@mui/material/Typography";
import type { FC } from "react";
import ContactSection from "../Contact/components/ContactSection";
import ServiceTimes from "../Contact/components/ServiceTimes";
import {
	aboutContent,
	details,
	HEADER,
	organization,
	organizationContent,
	SUBHEADER,
} from "./constants";

const organizationSx: SxProps<Theme> = {
	"& strong": { color: "text.secondary" },
	color: "text.primary",
}

const AboutUs: FC = () => {
	return (
		<>
			<PageTitle title={HEADER} subtitle={SUBHEADER} />
			<Stack spacing={2} className="fade-in" sx={{}}>
				{aboutContent.map((i) => (
					<Typography
						variant="body1"
						color="text.primary"
						key={i}
						dangerouslySetInnerHTML={{ __html: i }}
					/>
				))}

				<ContactSection title={organization}>
					<Typography
						variant="body1"
						sx={organizationSx}
						dangerouslySetInnerHTML={{ __html: organizationContent }}
					/>
				</ContactSection>

				{details.map((i) => (
					<ContactSection key={i.title} title={i.title}>
						<Typography
							variant="body1"
							color="text.primary"
							dangerouslySetInnerHTML={{ __html: i.content }}
						/>
					</ContactSection>
				))}

				<ServiceTimes />
			</Stack>
		</>
	);
};

export default AboutUs;
