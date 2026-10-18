import type { PCardProps } from "@components/ProjectCard";
import { Card } from "antd";
import type { CSSProperties, FC } from "react";



const cardSx: CSSProperties = {
	display: "flex",
	flexDirection: "column",
	borderRadius: '8px',
	maxWidth: `350px`,
	gap: '16px',
};

const ProjectCard: FC<PCardProps> = ({
	actions,
	header,
	className,
	children,
}) => {
	return (
		<Card
			actions={actions}
			className={`card-animation ${className}`}
			style={cardSx}
		>
			<Card.Meta
				avatar={header.avatar}
				description={header.description}
				style={{ marginBottom: '16px' }}
				title={header.title}
			/>
			{children}
		</Card>
	);
};

export default ProjectCard;
