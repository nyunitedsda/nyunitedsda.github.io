import { MailFilled, MailOutlined, PhoneOutlined, YoutubeOutlined } from "@ant-design/icons";
import {
	FooterContact,
	FooterSegment,
	FooterServiceTime,
	FooterSocial,
} from "@components/Footer";
import footer from "@constants/footer";
import { useMenuItems } from "@hooks/routes";
import ListItem from "@mui/material/ListItem";
import { Col, Divider, Layout, Row, Typography, theme } from "antd";
import dayjs from "dayjs";
import type { FC, ReactNode } from "react";



const iconMap: Record<string, ReactNode> = {
	YouTube: <YoutubeOutlined style={{ fontSize: '1.125rem', color: 'red' }} />,
	Phone: <PhoneOutlined style={{ fontSize: "large" }} />,
	Email: <MailFilled style={{ fontSize: "large" }} />,
	Mail: <MailOutlined style={{ fontSize: "large" }} />,
};

const columnSize = {
	xs: { "flex": "100%" },
	sm: { "flex": "50%" },
	lg: { "flex": "25%" },
}

const Footer: FC = () => {
	const { activeMenu } = useMenuItems();
	const { token } = theme.useToken();

	return (
		<Layout.Footer >
			<Row
				justify={{ xs: 'start', sm: 'center' }}
				style={{ maxWidth: token.screenXL, margin: 'auto' }}
			>

				{/* Social Media */}
				<Col {...columnSize}>
					<FooterSocial iconMap={iconMap} />
				</Col>
				{/* Menu */}
				<Col {...columnSize}>
					<FooterSegment title={footer.QUICK_LINKS}>
						{activeMenu.map((i) => (
							<ListItem
								component={"a"}
								href={i.path}
								key={i.name}
								disablePadding
								style={{
									color: token.colorPrimaryText,

								}}
							>
								{i.name}
							</ListItem>
						))}
					</FooterSegment>
				</Col>

				{/* Services */}
				<Col {...columnSize}>
					<FooterServiceTime />
				</Col>

				{/* Contacts */}
				<Col {...columnSize}>
					<FooterContact iconMap={iconMap} />
				</Col>
			</Row>

			<Divider style={{
				backgroundColor: token.colorPrimaryBorder,
			}} />

			<Row justify={'center'} style={{ color: token.colorPrimaryText }}>
				<Typography.Text
					style={{ color: "inherit" }}>
					&copy; {`${dayjs().year()} `}
				</Typography.Text>
				<Typography.Text
					style={{
						fontWeight: 'bold',
						fontStyle: 'italic',
						paddingLeft: '4px',
						color: 'inherit',
					}}
				>
					{footer.WEBSITE_TITLE}
				</Typography.Text>
				<Typography.Text
					style={{ color: "inherit" }}>
					{'. All rights reserved'}
				</Typography.Text>
			</Row>
		</Layout.Footer>
	);
};

export default Footer;
