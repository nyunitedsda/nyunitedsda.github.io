import type { SxProps, Theme } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import type { FC } from "react";
import type { CardProps } from "./types";

const cardContentSx: SxProps<Theme> = {
	display: "flex",
	flexDirection: "column",
	gap: 2,
	flexGrow: 1,
	overflowY: "auto",
	py: 1,
};

const cardSx: SxProps<Theme> = (theme) => ({
	display: "flex",
	flexDirection: "column",
	boxShadow: 5,
	borderRadius: 1,
	maxWidth: `${theme.spacing(50)}`,
	"& .MuiCardHeader-root": {
		color: (theme) => `${theme.palette.primary.contrastText} !important`,
	},
	"& .MuiCardHeader-title": {
		fontSize: "1.25rem",
		fontFamily: "inter",
	},
});

const ProjectCard: FC<CardProps> = ({
	actions,
	content,
	header,
	className,
}) => {
	return (
		<Card sx={cardSx} className={`card-animation ${className}`}>
			<CardHeader {...header} />
			{content && <CardContent sx={cardContentSx}>{content}</CardContent>}
			{actions && <CardActions>{actions}</CardActions>}
		</Card>
	);
};

export default ProjectCard;
