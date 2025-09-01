import ProjectCard from "@components/ProjectCard";
import { InfoOutlined } from "@mui/icons-material";
import Box from "@mui/material/Box";
import type { SxProps, Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import {
	type AnnouncementCardProps,
	cardStyles,
	createFormattedContent,
	NoteSection,
} from "@pages/Home";
import { type FC, useMemo } from "react";

const headerSx: SxProps<Theme> = {
	bgcolor: (theme) => theme.palette.primary.main,
	"& .MuiTypography-root": {
		color: (theme) => theme.palette.primary.contrastText,
	},
	width: "100%",
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
	const { title, description, className } = props;

	const contents = useMemo(() => createFormattedContent(props), [props]);

	return (
		<ProjectCard
			className={className ?? ""}
			header={{ title, sx: headerSx }}
			content={contents.map(({ title, ...rest }) => (
				<NoteSection {...rest} key={title} title={`${title}:`} />
			))}
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
