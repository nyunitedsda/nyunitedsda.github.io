import { Box, IconButton } from "@mui/material";
import Typography from "@mui/material/Typography";
import type { FC, ReactNode } from "react";
import {
	MOTTO,
	socialMediaInfo,
	WEBSITE_TITLE,
} from "../../../constants/footer";
import { FOOTER_LEGAL_LINKS } from "../constants";
import FooterSegment from "./FooterSegment";

const FooterSocial: FC<{ iconMap: Record<string, ReactNode> }> = ({
	iconMap,
}) => {
	return (
		<FooterSegment title={WEBSITE_TITLE} subtitle={MOTTO.text}>
			{FOOTER_LEGAL_LINKS.map((i) => (
				<Typography
					component="a"
					href={i.href}
					key={i.label}
					target="_self"
					variant="body2"
				>
					{i.label}
				</Typography>
			))}

			<Box display="flex" gap={1}>
				{socialMediaInfo.map((i) => (
					<IconButton
						aria-label={i.label}
						component="a"
						disabled={i.disabled}
						href={i.href}
						key={i.label}
						size="small"
						sx={{
							"& .MuiSvgIcon-root": {
								...(i.icon === "YouTube" ? { fill: "red !important" } : {}),
							},
						}}
						target="__blank"
						title={i.label}
					>
						{iconMap[i.icon]}
					</IconButton>
				))}
			</Box>
		</FooterSegment>
	);
};

export default FooterSocial;
