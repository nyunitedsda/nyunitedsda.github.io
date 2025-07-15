import Box from "@mui/material/Box";
import type { SxProps, Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import type { FC } from "react";
import Image from "../../../components/Image/Image";
import ProjectCard from "../../../components/ProjectCard/ProjectCard";
import { cardStyles } from "./AnnouncementCard/cardStyles";
import type { MinistryCardProps } from "./types";

const { headerSx } = cardStyles;

const contentSx: SxProps<Theme> = {
	display: "flex",
	alignItems: "center",
	overflow: "hidden",
	"& a": {
		textDecoration: "none",
		color: "primary.light",
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
			actions={image ? <Image {...image} /> : undefined}
		/>
	);
};

export default MinistryCard;
