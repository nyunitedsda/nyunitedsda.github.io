import { type MinistryCardProps } from "@pages/Home";
import { Card, theme, Typography } from "antd";
import type { CSSProperties, FC } from "react";
import { Link } from "react-router";

const imageStyles: CSSProperties = {
	objectFit: "scale-down",
	maxWidth: "100%",
	maxHeight: "64px",
	height: "45px",
	aspectRatio: "auto",
};

const cardSx: CSSProperties = {
	display: "flex",
	flexDirection: "column",
	borderRadius: '8px',
	maxWidth: `350px`,
	gap: '16px',
};

const MinistryCard: FC<MinistryCardProps> = (props) => {
	const { header, content, link, image } = props;
	const {token} = theme.useToken();
	return (
		<Card
			styles={{
				header: {
					backgroundColor: token.colorPrimary,
					color: token.colorPrimaryText,
				}
			}}
			style={cardSx}
			title={header.title}
			actions={[
				image ? (
					<Link to={link as string} target={"_blank"} >
					<img src={image.src} alt={image.alt} style={imageStyles} />
					</Link>
				) : undefined
			]}
		>
			<Typography.Paragraph ellipsis={{ rows: 3 }}>
				{content}
			</Typography.Paragraph>
		</Card>
	);
};

export default MinistryCard;
