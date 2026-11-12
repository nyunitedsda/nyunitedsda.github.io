import { YoutubeOutlined } from "@ant-design/icons";
import { FOOTER_LEGAL_LINKS, FooterSegment } from "@components/Footer";
import footer from "@constants/footer";
import { Button, Flex, Typography, theme } from "antd";
import type { FC, ReactNode } from "react";
import { Link, useNavigate } from "react-router";

const { WEBSITE_TITLE, MOTTO } = footer;
const youTubeLink = 'https://www.youtube.com/@161nyusda';

const FooterSocial: FC<{ iconMap: Record<string, ReactNode> }> = () => {
	const { token } = theme.useToken();
	const navigate = useNavigate();

	return (
		<FooterSegment title={WEBSITE_TITLE} subtitle={MOTTO.text}>
			{FOOTER_LEGAL_LINKS.map((i) => (
				<Typography.Text key={i.label}>
					<Link
						to={i.href}
						target="_self"
						style={{
							color: token.colorPrimaryText,
						}}
					>
						{i.label}
					</Link>
				</Typography.Text>
			))}

			<Flex gap={1}>
				<Button
					type="text"
					style={{ color: token.colorPrimaryText, paddingLeft: 0 }}
					icon={
						<YoutubeOutlined
							style={{ color: token.colorError, fontSize: 24 }}
						/>
					}
					onClick={() => navigate(youTubeLink,{})}
				>
					<a href={youTubeLink} target="__blank" rel="noopener noreferrer" >{"YouTube Channel"}</a>
				</Button>
			</Flex>
		</FooterSegment>
	);
};

export default FooterSocial;
