import { Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import type { FC } from "react";
import { Navigate } from "react-router";
import { getDatabaseList } from "../../api/request/commonQueries";
import type { DonationDT } from "../../api/request/databaseTypes";
import RingLoader from "../../components/Loaders/RingLoader";
import PageTitle from "../../components/PageWrapper/PageTitle";
import {
	DONATION_HEADER,
	DONATION_SUBHEADER,
	DONATION_TEXT,
} from "../../constants/donationConstant";
import { ROUTE_PATHS } from "../../hooks/routes/reviewedRoutes";

const Donations: FC = () => {
	const { isLoading, data, error } = useQuery({
		queryKey: ["get-donations"],
		queryFn: async () => await getDatabaseList("donations"),
	});

	return (
		<>
			<PageTitle title={DONATION_HEADER} subtitle={DONATION_SUBHEADER} />
			<Stack spacing={2} className="fade-in">
				<Typography color="text.primary">{DONATION_TEXT}</Typography>
				{isLoading && (
					<Stack
						width="100%"
						height="100%"
						justifyContent="center"
						className="fade-in"
					>
						<RingLoader />
					</Stack>
				)}

				{!isLoading &&
					data &&
					data.length !== 0 &&
					(data as DonationDT[]).map((i) => (
						<Typography
							key={i.title}
							color="text.primary"
							dangerouslySetInnerHTML={{
								__html: `<strong>${i.title}: </strong>${i.description}`,
							}}
						/>
					))}
				{error && (
					<Navigate to={ROUTE_PATHS.NOT_FOUND} replace state={{ error }} />
				)}
			</Stack>
		</>
	);
};

export default Donations;
