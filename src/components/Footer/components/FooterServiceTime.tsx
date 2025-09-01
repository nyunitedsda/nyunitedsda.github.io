import { FooterSegment, FooterSegmentSkeleton } from "@components/Footer";
import Typography from "@mui/material/Typography";
import { CONTACT_CONSTANT } from "@pages/Contact";
import type { FC } from "react";
import { useLoaderData } from "react-router";
import type { ServiceDT } from "@/api";

const FooterServiceTime: FC = () => {
	const { services, isLoading } = useLoaderData();
	return (
		<FooterSegment isLoading={isLoading} title={CONTACT_CONSTANT.SERVICES}>
			{isLoading || !services ? (
				<FooterSegmentSkeleton />
			) : (
				services?.map((i: ServiceDT) => (
					<Typography key={i.title} variant="body2">
						<strong>{`${i.title}: `}</strong> {i.time}
					</Typography>
				))
			)}
		</FooterSegment>
	);
};

export default FooterServiceTime;
