import RingLoader from "@components/Loaders";
import { PageTitle } from "@components/PageWrapper";
import {
	DONATION_HEADER,
	DONATION_SUBHEADER,
	DONATION_TEXT,
} from "@constants/donationConstant";
import { useEntityList } from "@hooks/api";
import { routePaths } from "@hooks/routes";
import { Stack } from "@mui/material";
import { Flex, Typography } from "antd";
import type { FC } from "react";
import { Navigate } from "react-router";
import type { DonationDT } from "@/api";

const Donations: FC = () => {
	const { data, error, isLoading } = useEntityList<DonationDT>("donations");

	return (
		<>
			<PageTitle title={DONATION_HEADER} subtitle={DONATION_SUBHEADER} />
			<Stack spacing={2} className="fade-in">
				<Typography.Text>{DONATION_TEXT}</Typography.Text>
				{isLoading && (
					<Flex
						vertical
						style={{ width: "100%", height: "100%", justifyContent: "center" }}
						className="fade-in"
					>
						<RingLoader />
					</Flex>
				)}

				{!isLoading &&
					data &&
					data.length !== 0 &&
					data.map((i) => (
						<Typography.Paragraph
							key={i.title}
							style={{ whiteSpace: "pre-line" }}
						>
							<Typography.Text strong style={{ fontSize: "medium" }}>
								{i.title}:{" "}
							</Typography.Text>
							<Typography.Text>{i.description}</Typography.Text>
						</Typography.Paragraph>
					))}
				{error && (
					<Navigate to={routePaths.NOT_FOUND} replace state={{ error }} />
				)}
			</Stack>
		</>
	);
};

export default Donations;
