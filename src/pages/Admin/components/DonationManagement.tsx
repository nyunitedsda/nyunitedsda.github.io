import { useQuery } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { type FC, useCallback, useState } from "react";
import { getDatabaseList } from "../../../api/request/commonQueries";
import { deleteEntity } from "../../../api/request/mutations";
import type { DonationType } from "../../../api/request/types";
import DataTable from "../../../components/DataTable/DataTable";
import type { GenericType } from "../../../components/DataTable/types";
import PageTitle from "../../../components/PageWrapper/PageTitle";
import DonationEditor from "../../../forms/collection/DonationEditor/DonationEditor";
import useToken from "../../../hooks/auth/useToken";
import { initialDonation } from "../../../test/mock_data/donations";
import { createAuthConfig } from "../../../utils/authUtils";
import donationColumns from "../constants/donationColumns";

const DONATION_SUBHEADER = "Manage your donation methods";

const DonationAdmin: FC = () => {
	const { accessToken } = useToken();
	const { enqueueSnackbar } = useSnackbar();

	const [createDonationOpen, setCreateDonationOpen] =
		useState<Partial<DonationType> | null>(null);

	const { data: queryData, refetch } = useQuery<DonationType[] | undefined>({
		queryKey: ["donations"],
		queryFn: () => getDatabaseList("donations", createAuthConfig(accessToken)),
		staleTime: 5 * 60 * 1000,
		refetchOnWindowFocus: false,
	});

	const _handleDeleteDonation = useCallback(
		(data: GenericType & { id: number }) => {
			deleteEntity("donations", data.id, createAuthConfig(accessToken))
				.then(() => {
					refetch();
					enqueueSnackbar("Donation deleted successfully", {
						variant: "success",
					});
				})
				.catch((error) => {
					console.error("Failed to delete donation:", error);
					enqueueSnackbar("Failed to delete donation", {
						variant: "error",
					});
				});
		},
		[accessToken],
	);

	return (
		<>
			<PageTitle
				title=""
				subtitle={DONATION_SUBHEADER}
				handleClick={() => setCreateDonationOpen(initialDonation)}
			/>

			<DataTable
				data={queryData as unknown as GenericType[]}
				columns={donationColumns}
				onEdit={setCreateDonationOpen}
				onDelete={_handleDeleteDonation}
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
