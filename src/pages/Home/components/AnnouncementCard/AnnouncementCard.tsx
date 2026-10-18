import { InfoOutlined } from "@mui/icons-material";
import Box from "@mui/material/Box";
import type { SxProps, Theme } from "@mui/material/styles";
import {Typography as Typo} from "@mui/material";
import {
	type AnnouncementCardProps,
	createFormattedContent,
	NoteSection,
} from "@pages/Home";
import { Card, theme, Typography } from "antd";
import { type CSSProperties, type FC, useMemo } from "react";

const cardSx: CSSProperties = {
	display: "flex",
	flexDirection: "column",
	borderRadius: '8px',
	maxWidth: `350px`,
	width: '100%',
	gap: '16px',
};

const descriptionSx: SxProps<Theme> = {
	pt: 2,
	display: "flex",
	alignItems: "center",
	gap: 2,
	height: "100%",
	borderTop: (theme) => `1px solid ${theme.palette.divider}`,
	"& p": {
		height: "inherit",
		overflowY: "auto",
	},
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
				}
			}}
			title={title}
			style={cardSx}
			actions={[
				description ?  (
					<Typography.Paragraph title={description}>{'more'}</Typography.Paragraph>
				) : undefined
			]}
		>
			{contents.map(({ title, ...rest }) => (
				<NoteSection {...rest} key={title} title={`${title}:`} />
			))}

			{
				description ? (
					<Box sx={descriptionSx}>
						<InfoOutlined color="primary" />

						<Typo
							variant="body2"
							color="text.secondary"
							fontWeight="bold"
						>
							{description}
						</Typo>
					</Box>
				) : undefined
			}
		</Card>
		
	);
};

export default AnnouncementCard;
