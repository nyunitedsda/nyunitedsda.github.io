import RingLoader from "@components/Loaders";
import { PageTitle } from "@components/PageWrapper";
import {
	DONATION_HEADER,
	DONATION_SUBHEADER,
	DONATION_TEXT,
} from "@constants/donationConstant";
import { useEntityList } from "@hooks/api";
import { routePaths } from "@hooks/routes";
import { Stack, Typography } from "@mui/material";
import type { FC } from "react";
import { Navigate } from "react-router";
import type { DonationDT } from "@/api";

const Donations: FC = () => {
	const { data, error, isLoading } = useEntityList<DonationDT>("donations");

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
					data.map((i) => (
						<Typography key={i.title} color="text.primary">
							<strong>{i.title}: </strong>
							{i.description}
						</Typography>
					))}
				{error && (
					<Navigate to={routePaths.NOT_FOUND} replace state={{ error }} />
				)}
			</Stack>
		</>
	);
};

export default Donations;
