import Typography from "@mui/material/Typography";
import { useQuery } from "@tanstack/react-query";
import { type FC } from "react";
import { getDatabaseList } from "../../../api/request/commonQueries";
import type { ServiceDT } from "../../../api/request/databaseTypes";
import { CONTACT_CONSTANT } from "../../../pages/Contact/components/contact";
import FooterSegment from "./FooterSegment";

const FooterServiceTime: FC = () => {
	const { data, isLoading, error } = useQuery<ServiceDT[]>({
		queryKey: ["services"],
		queryFn: async () => getDatabaseList("services"),
	});

	return (
		<>
			{!error && (
				<FooterSegment isLoading={isLoading} title={CONTACT_CONSTANT.SERVICES}>
					{data?.map((i) => (
						<Typography key={i.title} variant="body2">
							<strong>{`${i.title}: `}</strong> {i.time}
						</Typography>
					))}
				</FooterSegment>
			)}
		</>
	);
};

export default FooterServiceTime;
