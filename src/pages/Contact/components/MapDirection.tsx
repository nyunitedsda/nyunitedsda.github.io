import { LinkOutlined } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { CONTACT_CONSTANT } from "@pages/Contact";
import { Card, type CardProps } from "antd";
import type { CSSProperties, FC } from "react";
import { Link } from "react-router";

const cardStyles: CardProps['styles'] = {
	root: {
		// boxShadow: '0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)',
	},
	header: {
		borderBottom: 'none'
	}
};

const plannerSx: CSSProperties = {
	textDecoration: "none",
	fontWeight: 'bold',
	display: 'flex',
	gap: '12px',
	alignItems: 'center',
	fontSize: '1.25rem',
};

const styleSx = { borderRadius: 4, width: "100%" };

const { TRIP_PLANNER, MAP_URL, TRANSIT_URL } = CONTACT_CONSTANT;

const MapDirection: FC = () => {
	const theme = useTheme();

	return (
		<Card
			styles={cardStyles}
			title={
				<Link
					style={{
						...plannerSx,
						color: `${theme.palette.primary.light}`
					}}
					title={"Open link to MTA "}
					to={TRANSIT_URL}
				>
					{TRIP_PLANNER}
					<LinkOutlined />
				</Link>
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
