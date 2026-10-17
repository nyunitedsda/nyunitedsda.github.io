import { PageTitle } from "@components/PageWrapper";
import { AlternateEmailOutlined } from "@mui/icons-material";
import {
	CONTACT_CONSTANT,
	ContactSection,
	MapDirection,
	ServiceTimes,
} from "@pages/Contact";
import { NoteSection } from "@pages/Home";
import { useQuery } from "@tanstack/react-query";
import type { CSSProperties, FC } from "react";
import { getDefaultContacts } from "@/api";
import { Card, Flex, Typography, type CardProps } from "antd";
import { EnvironmentOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";

const contactDetailSx: CardProps['styles'] = {
	root: {
		display: "flex",
		flexDirection: "column",
		margin: '16px 0px 24px',
	}
};

const iconStyle: CSSProperties = {
	fontSize: '1rem',
	color: 'inherit',
}

const Contact: FC = () => {
	const { data, isLoading, error } = useQuery({
		queryKey: ["contactInfo"],
		queryFn: async () => getDefaultContacts(),
	});

	return (
		<>
			<PageTitle
				subtitle={CONTACT_CONSTANT.PAGE_SUBTITLE}
				title={CONTACT_CONSTANT.PAGE_TITLE}
			/>

			<Card styles={contactDetailSx}>
				{/* address */}
				{!isLoading && !error && (
					<>

						<ContactSection title={data?.contact_name}>

							{[
								{
									id: 1,
									icon: <EnvironmentOutlined style={iconStyle} />,
									content: (
										<Flex vertical>
											<Typography.Text >{data.street}</Typography.Text>
											<Typography.Text >
												{`${data.city}, ${data.zip_code}, ${data.country}`}
											</Typography.Text></Flex>
									)
								},
								{
									id: 2,
									icon: <PhoneOutlined style={iconStyle} />,
									component: "a",
									href: `tel:${data.phone}`,
									content: data.phone,
								},
								{
									id: 3,
									icon: <AlternateEmailOutlined style={iconStyle} />,
									component: "a",
									href: `mailto:${data.email}`,
									content: data.email,
								},
							].map(({ id, ...rest }) => (
								<NoteSection {...rest} key={id} />
							))}
						</ContactSection>

						<ContactSection title={CONTACT_CONSTANT.MAILING_ADDRESS_TITLE}>
							<NoteSection
								columnLayout
								content={data.mail_address}
								icon={<MailOutlined style={iconStyle} />}
								title={data.mailing_recipient}
							/>
						</ContactSection>
					</>
				)}

				<ServiceTimes />
			</Card>

			<MapDirection />
		</>
	);
};

export default Contact;
