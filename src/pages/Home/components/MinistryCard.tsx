import Box from "@mui/material/Box";
import type { SxProps, Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import type { CSSProperties, FC } from "react";
import ProjectCard from "../../../components/ProjectCard/ProjectCard";
import { cardStyles } from "./AnnouncementCard/cardStyles";
import type { MinistryCardProps } from "./types";

const { headerSx } = cardStyles;
const imageStyles: CSSProperties = {
	objectFit: "scale-down",
	maxWidth: "100%",
	maxHeight: "64px",
	height: "auto",
	// Improve CLS (Cumulative Layout Shift)
	aspectRatio: "auto",
};

const contentSx: SxProps<Theme> = {
	display: "flex",
	alignItems: "center",
	overflow: "hidden",
	"& a": {
		textDecoration: "none",
		color:  theme=> `${theme.palette.primary.light} !important`,
	},
};

const MinistryCard: FC<MinistryCardProps> = (props) => {
	const { header, content, link, image } = props;
	return (
		<ProjectCard
			header={{
				...header,
				sx: headerSx,
			}}
			content={
				<Box sx={contentSx}>
					<Typography variant="body1">
						{content}
						<a href={link}>{" Click here"}</a>
					</Typography>
				</Box>
			}
			actions={image?.image ? <img src={image.image.src} alt={image.image.alt} style={imageStyles} /> : undefined}
		/>
	);
};

export default MinistryCard;
