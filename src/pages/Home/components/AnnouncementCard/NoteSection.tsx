import Box from "@mui/material/Box";
import type { SxProps, Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { type FC, memo } from "react";
import type { NoteSectionProps } from "./types";

const noteSx: SxProps<Theme> = {
	display: "flex",
	alignItems: "center",
	gap: 2,
	"& svg": { color: "primary.light" },
};

const contentSx: SxProps<Theme> = { display: "flex", rowGap: 0, columnGap: 2 };

const NoteSection: FC<NoteSectionProps> = ({
	icon,
	content,
	title,
	columnLayout = false,
}) => (
	<Box sx={noteSx}>
		{icon && icon}
		<Box sx={[contentSx, { flexDirection: columnLayout ? "column" : "row" }]}>
			{title && (
				<Typography variant="body1" color="text.primary" fontWeight="bold">
					{title}
				</Typography>
			)}
			{content && (
				<Typography color="text.primary" variant="body1">
					{content}
				</Typography>
			)}
		</Box>
	</Box>
);

export default memo(NoteSection);
