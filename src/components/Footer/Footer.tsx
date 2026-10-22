import { YoutubeOutlined } from "@ant-design/icons";
import {
	FooterContact,
	FooterSegment,
	FooterServiceTime,
	FooterSocial,
} from "@components/Footer";
import footer from "@constants/footer";
import { useMenuItems } from "@hooks/routes";
import { AlternateEmailOutlined, EmailOutlined } from "@mui/icons-material";
import Facebook from "@mui/icons-material/Facebook";
import Instagram from "@mui/icons-material/Instagram";
import Phone from "@mui/icons-material/Phone";
import Twitter from "@mui/icons-material/Twitter";
import ListItem from "@mui/material/ListItem";
import { Col, Divider, Layout, Row, theme, Typography } from "antd";
import dayjs from "dayjs";
import type { FC, ReactNode } from "react";



const iconMap: Record<string, ReactNode> = {
	Facebook: <Facebook />,
	Instagram: <Instagram />,
	Twitter: <Twitter />,
	YouTube: <YoutubeOutlined style={{ fontSize: '1.125rem', color: 'red' }} />,
	Phone: <Phone fontSize="small" />,
	Email: <AlternateEmailOutlined fontSize="small" />,
	Mail: <EmailOutlined fontSize="small" />,
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

			<Divider />

			<Row justify={'center'}>
				<Typography.Text >&copy; {`${dayjs().year()} `}</Typography.Text>
				<Typography.Text
					style={{ fontWeight: 'bold', fontStyle: 'italic', paddingLeft: '4px' }}
				>
					{footer.WEBSITE_TITLE}
				</Typography.Text>
				<Typography.Text >{'. All rights reserved'}</Typography.Text>
			</Row>
		</Layout.Footer>
	);
};

export default Footer;
