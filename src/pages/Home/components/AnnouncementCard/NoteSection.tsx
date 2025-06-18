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
			{title && (
				<Typography
					variant="body1"
					color="text.primary"
					fontWeight="bold"
					dangerouslySetInnerHTML={{ __html: title }}
				/>
			)}
			{content && (
				<Typography
					color="text.primary"
					variant="body1"
					dangerouslySetInnerHTML={{ __html: content }}
				/>
			)}
		</Box>
	</Box>
);

export default memo(NoteSection);
