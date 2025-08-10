import Typography from "@mui/material/Typography";
import type { FC } from "react";
import { useLoaderData } from "react-router";
import type { ServiceDT } from "@/api";
import { CONTACT_CONSTANT } from "../../../pages/Contact/components/contact";
import FooterSegment from "./FooterSegment";
import FooterSegmentSkeleton from "./FooterSegmentSkeleton";

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
