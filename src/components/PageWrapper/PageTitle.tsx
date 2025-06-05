import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { SxProps, Theme } from "@mui/material/styles";
import type { FC } from "react";
import type { PageTitleProps } from "./types";

const titleSx: SxProps<Theme> = {
	fontWeight: "bold",
	color: "primary.light",
	fontFamily: "inter",
};

const subtitleSx: SxProps<Theme> = {
	fontWeight: "bold",
	color: "text.primary",
};

const PageTitle: FC<PageTitleProps> = ({ subtitle, title }) => {
	return (
		<Stack spacing={2} sx={{ pb: 2 }} className="fade-in">
			<Typography variant="h3" component="h1" sx={titleSx}>
				{title}
			</Typography>
			{subtitle && (
				<Typography variant="h6" sx={subtitleSx}>
					{subtitle}
				</Typography>
			)}
		</Stack>
	);
};

export default PageTitle;
