import { InfoOutlined } from "@mui/icons-material";
import Box from "@mui/material/Box";
import type { SxProps, Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { type FC, useMemo } from "react";
import ProjectCard from "../../../../components/ProjectCard/ProjectCard";
import { cardStyles } from "./cardStyles";
import { createFormattedContent } from "./helpers";
import NoteSection from "./NoteSection";
import type { AnnouncementCardProps } from "./types";

const { headerSx } = cardStyles;

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
	const { title, description, className } = props;

	const contents = useMemo(() => createFormattedContent(props), [props]);
	console.log("contents: ", contents);

	return (
		<ProjectCard
			className={className ?? ""}
			header={{ title, sx: headerSx }}
			content={
				<>
					{contents.map(({ title, ...rest }) => (
						<NoteSection {...rest} key={title} title={`${title}:`} />
					))}
				</>
			}
			actions={
				description ? (
					<Box sx={descriptionSx}>
						<InfoOutlined color="primary" />

						<Typography
							variant="body2"
							color="text.secondary"
							fontWeight="bold"
						>
							{description}
						</Typography>
					</Box>
				) : undefined
			}
		/>
	);
};

export default AnnouncementCard;
