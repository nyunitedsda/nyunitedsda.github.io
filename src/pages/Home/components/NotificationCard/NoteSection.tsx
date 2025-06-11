import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type { SxProps, Theme } from "@mui/material/styles";
import { type FC, memo } from "react";
import type { NoteSectionProps } from "./types";

const noteSx: SxProps<Theme> = {
	display: "flex",
	alignItems: "center",
	gap: 2,
	"& svg": { color: "primary.light" },
};

const contentSx: SxProps<Theme> = { display: "flex", gap: 2 };

const NoteSection: FC<NoteSectionProps> = ({ icon, content, title }) => (
	<Box sx={noteSx}>
		{icon && icon}
		<Box sx={contentSx}>
			<Typography variant="body1" color="text.secondary" fontWeight="bold">
				{title}
			</Typography>
			<Typography variant="body1">{content}</Typography>
		</Box>
	</Box>
);

export default memo(NoteSection);
