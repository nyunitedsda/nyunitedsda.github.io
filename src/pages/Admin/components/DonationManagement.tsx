import { useQuery } from "@tanstack/react-query";
import { type FC, useCallback, useEffect, useState } from "react";
import { deleteEntity } from "../../../api/request/commonMutations";
import { getDatabaseList } from "../../../api/request/commonQueries";
import type { DonationType } from "../../../api/request/types";
import DataTable from "../../../components/DataTable/DataTable";
import PageTitle from "../../../components/PageWrapper/PageTitle";
import DonationEditor from "../../../forms/collection/DonationEditor/DonationEditor";
import { initialDonation } from "../../../test/mock_data/donations";
import { createAuthConfig } from "../../../utils/authUtils";
import donationColumns from "../constants/donationColumns";
import useToken from "../../../hooks/auth/useToken";

const DONATION_SUBHEADER = "Manage your donation methods";

const DonationAdmin: FC = () => {
	const [donationData, setDonationData] = useState<Partial<DonationType>[]>([]);
	const [createDonationOpen, setCreateDonationOpen] =
		useState<Partial<DonationType> | null>(null);
	const { accessToken } = useToken();

	const { data: queryData, refetch } = useQuery<
		{ data: DonationType[] } | undefined
	>({
		queryKey: ["donations"],
		queryFn: () => getDatabaseList("donations", createAuthConfig(accessToken)),
		staleTime: 5 * 60 * 1000,
		refetchOnWindowFocus: false,
	});

	useEffect(() => {
		if (queryData && Array.isArray(queryData.data)) {
			setDonationData(queryData.data);
		}
	}, [queryData]);

	const _handleDeleteDonation = useCallback((id: number) => {
		deleteEntity("donations", id, createAuthConfig(accessToken))
			.then(() => {
				setDonationData((prev) =>
					prev.filter((donation) => donation?.id !== id),
				);
			})
			.catch((error) => {
				console.error("Failed to delete donation:", error);
			});
	}, []);

	return (
		<>
			<PageTitle
				title=""
				subtitle={DONATION_SUBHEADER}
				handleClick={() => setCreateDonationOpen(initialDonation)}
			/>

			<DataTable
				data={donationData}
				columns={donationColumns}
				onEdit={(d) => setCreateDonationOpen(d)}
				onDelete={(d) => _handleDeleteDonation(d?.id as number)}
				onView={(d) => setCreateDonationOpen(d)}
			/>

			{createDonationOpen && (
				<DonationEditor
					open={!!createDonationOpen}
					data={createDonationOpen as DonationType}
					onClose={() => setCreateDonationOpen(null)}
					onSuccess={() => {
						refetch();
						setCreateDonationOpen(null);
					}}
				/>
			)}
		</>
	);
};

export default DonationAdmin;
