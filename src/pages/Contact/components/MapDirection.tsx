import { LinkOutlined } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { CONTACT_CONSTANT } from "@pages/Contact";
import { Card, type CardProps } from "antd";
import type { CSSProperties, FC } from "react";




const cardStyles: CardProps['styles'] = {
	root: {
		boxShadow: '0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)',
	},
	header: {
		borderBottom: 'none'

}};

const plannerSx: CSSProperties = {
	textDecoration: "none",
	fontWeight: 'bold',
	display: 'flex',
	gap: '12px',
	alignItems: 'center',
};

const styleSx = { borderRadius: 4, width: "100%" };

const { TRIP_PLANNER, MAP_URL, TRANSIT_URL } = CONTACT_CONSTANT;

const MapDirection: FC = () => {
	const theme = useTheme();

	return (
		<Card
			styles={cardStyles}
			title={
				<Typography
					variant="h6"
					component={"a"}
					style={{
						...plannerSx,
						color: `${theme.palette.primary.main}`
					}}
					title={"Open link to MTA "}
					href={TRANSIT_URL}
				>
					{TRIP_PLANNER}
					<LinkOutlined style={{ color: theme.palette.primary.main }} />
				</Typography>
			}>
			
			<iframe
				src={MAP_URL}
				height="450"
				style={styleSx}
				allowFullScreen
				referrerPolicy="no-referrer-when-downgrade"
				title="Google Maps Location"
			/>
		</Card>
	);
};

export default MapDirection;
