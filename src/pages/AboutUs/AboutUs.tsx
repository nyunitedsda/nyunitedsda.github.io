import { PageTitle } from "@components/PageWrapper";
import { Flex, Typography } from "antd";
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

const AboutUs: FC = () => {
	return (
		<>
			<PageTitle title={HEADER} subtitle={SUBHEADER} />
			<Flex vertical className="fade-in" >
				{aboutContent.map((i) => (
					<Typography.Paragraph key={i}>
						{i}
					</Typography.Paragraph>
				))}

				<ContactSection title={organization}>
					<Typography.Paragraph
					>
						{organizationContent}
					</Typography.Paragraph>
				</ContactSection>

				{details.map((i) => (
					<ContactSection key={i.title} title={i.title}>
						<Typography.Paragraph >
							{i.content}
						</Typography.Paragraph>
					</ContactSection>
				))}

				<ServiceTimes />
			</Flex>
		</>
	);
};

export default AboutUs;
