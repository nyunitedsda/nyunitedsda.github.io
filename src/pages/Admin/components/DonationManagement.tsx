import DataTable from "@components/DataTable";
import { PageTitle } from "@components/PageWrapper";
import { DonationEditor } from "@forms/collection";
import { useEntityList } from "@hooks/api";
import { usePermission } from "@hooks/auth";
import { initialDonation } from "@test/mock_data";
import { useSnackbar } from "notistack";
import { type FC, useCallback, useState } from "react";
import { type DonationDT, deleteEntity } from "@/api";
import donationColumns from "../constants/donationColumns";

const DONATION_SUBHEADER = "Manage your donation methods";

const DonationAdmin: FC = () => {
	const { enqueueSnackbar } = useSnackbar();
	const { canCreate, canEdit, canDelete } = usePermission("donations");
	const {
		data: queryData,
		refetch,
		isLoading,
	} = useEntityList<DonationDT>("donations");

	const [createDonationOpen, setCreateDonationOpen] =
		useState<Partial<DonationDT> | null>(null);

	const _handleDeleteDonation = useCallback(
		(data: Partial<DonationDT>) => {
			deleteEntity("donations", data?.id as number)
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
				data={queryData ?? []}
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
