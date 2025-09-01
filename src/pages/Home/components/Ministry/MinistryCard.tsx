import ProjectCard from "@components/ProjectCard";
import Box from "@mui/material/Box";
import type { SxProps, Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { cardStyles, type MinistryCardProps } from "@pages/Home";
import type { CSSProperties, FC } from "react";

const { headerSx } = cardStyles;

const imageStyles: CSSProperties = {
	objectFit: "scale-down",
	maxWidth: "100%",
	maxHeight: "64px",
	height: "auto",
	aspectRatio: "auto",
};

const contentSx: SxProps<Theme> = {
	display: "flex",
	alignItems: "center",
	overflow: "hidden",
	"& a": {
		textDecoration: "none",
		color: (theme) => `${theme.palette.primary.light} !important`,
	},
};

const MinistryCard: FC<MinistryCardProps> = (props) => {
	const { header, content, link: _, image } = props;
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
						{/* <a href={link}>{" Click here"}</a> */}
					</Typography>
				</Box>
			}
			actions={
				image ? (
					<img src={image.src} alt={image.alt} style={imageStyles} />
				) : undefined
			}
		/>
	);
};

export default MinistryCard;
