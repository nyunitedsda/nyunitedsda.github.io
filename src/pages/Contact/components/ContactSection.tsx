import Stack from "@mui/material/Stack";
import type { SxProps, Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import type { FC, PropsWithChildren } from "react";

const ContactSection: FC<
	PropsWithChildren<{ title: string; sx?: SxProps<Theme> }>
> = ({ children, title, sx }) => (
	<Stack sx={[{ gap: 1 }, ...(Array.isArray(sx) ? sx : [sx])]}>
		<Typography fontWeight="bold" variant="h5" sx={{ color: "primary.light" }}>
			{title}
		</Typography>
		<Stack sx={{ pl: 2, gap: 1 }}>{children}</Stack>
	</Stack>
);

export default ContactSection;
