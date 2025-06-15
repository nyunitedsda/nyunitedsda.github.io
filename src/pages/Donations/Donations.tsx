import { Stack, Typography } from "@mui/material";
import type { FC } from "react";
import { performQuery } from "../../api/queryData";
import { getDonations } from "../../api/request/donations";
import RingLoader from "../../components/Loaders/RingLoader";
import PageTitle from "../../components/PageWrapper/PageTitle";
import {
	DONATION_HEADER,
	DONATION_SUBHEADER,
	DONATION_TEXT,
} from "../../constants/donationConstant";

import type { Donations as DonationsType } from "../../api/request/types";

const Donations: FC = () => {
	const { isLoading, data } = performQuery(["get-donations"], getDonations);

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
					(data || ([] as DonationsType[])).map((i) => (
						<Typography
							key={i.title}
							color="text.primary"
							dangerouslySetInnerHTML={{
								__html: `<strong>${i.title}: </strong>${i.description}`,
							}}
						/>
					))}
			</Stack>
		</>
	);
};

export default Donations;
