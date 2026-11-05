import { InfoCircleOutlined } from "@ant-design/icons";
import {
	type AnnouncementCardProps,
	createFormattedContent,
	NoteSection,
} from "@pages/Home";
import { Card, Flex, Typography, theme } from "antd";
import { type CSSProperties, type FC, useMemo } from "react";

const cardSx: CSSProperties = {
	display: "flex",
	flexDirection: "column",
	borderRadius: '8px',
	maxWidth: `350px`,
	width: '100%',
	gap: '16px',
	margin: '0 auto',
	height: '320px',
};

const descriptionSx: CSSProperties = {
	display: "flex",
	alignItems: "center",
	gap: '16px',
	height: "100%",
};

const AnnouncementCard: FC<AnnouncementCardProps> = (props) => {
	const { title, description } = props;
	const { token } = theme.useToken();
	const contents = useMemo(() => createFormattedContent(props), [props]);

	return (
		<Card
			styles={{
				header: {
					backgroundColor: token.colorPrimary,
					color: token.colorPrimaryText,
				},
				body: {
					display: "flex",
					flexDirection: "column",
					gap: "8px",
				}
			}}
			title={title}
			style={cardSx}

		>
			{
				contents.map(({ title, ...rest }) => (
					<NoteSection {...rest} key={title} title={`${title}:`} />
				))
			}

			{
				description ? (
					<Flex style={descriptionSx}>
						<InfoCircleOutlined style={{ color: token.colorPrimary, fontSize: '24px' }} />

						<Typography.Paragraph ellipsis={{ tooltip: description, rows: 3 }} >
							{description}
						</Typography.Paragraph>
					</Flex>
				) : undefined
			}
		</Card >

	);
};

export default AnnouncementCard;
