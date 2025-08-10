import { useQuery } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { type FC, useCallback, useState } from "react";
import type { DonationDT } from "../../../api/request";
import { getDatabaseList } from "../../../api/request/commonQueries";
import { deleteEntity } from "../../../api/request/mutations";
import DataTable from "../../../components/DataTable/DataTable";
import PageTitle from "../../../components/PageWrapper/PageTitle";
import DonationEditor from "../../../forms/collection/DonationEditor/DonationEditor";
import usePermission from "../../../hooks/auth/usePermission";
import { initialDonation } from "../../../test/mock_data";
import donationColumns from "../constants/donationColumns";

const DONATION_SUBHEADER = "Manage your donation methods";

const DonationAdmin: FC = () => {
	const { enqueueSnackbar } = useSnackbar();
	const { canCreate, canEdit, canDelete } = usePermission("donations");

	const [createDonationOpen, setCreateDonationOpen] =
		useState<Partial<DonationDT> | null>(null);

	const {
		data: queryData,
		refetch,
		isLoading,
	} = useQuery<DonationDT[] | undefined>({
		queryKey: ["donations"],
		queryFn: () => getDatabaseList("donations"),
		staleTime: 5 * 60 * 1000,
		refetchOnWindowFocus: false,
	});

	const _handleDeleteDonation = useCallback(
		(data: DonationDT) => {
			deleteEntity("donations", data.id)
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
		[refetch, enqueueSnackbar],
	);

	return (
		<>
			<PageTitle
				title=""
				subtitle={DONATION_SUBHEADER}
				handleClick={
					canCreate ? () => setCreateDonationOpen(initialDonation) : undefined
				}
			/>

			<DataTable
				isLoading={isLoading}
				data={queryData as DonationDT[]}
				columns={donationColumns}
				onEdit={canEdit ? setCreateDonationOpen : undefined}
				onDelete={canDelete ? _handleDeleteDonation : undefined}
			/>

			{createDonationOpen && (
				<DonationEditor
					open={!!createDonationOpen}
					data={createDonationOpen as DonationDT}
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
