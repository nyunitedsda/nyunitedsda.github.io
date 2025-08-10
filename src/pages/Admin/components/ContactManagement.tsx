import DataTable from "@components/DataTable";
import { PageTitle } from "@components/PageWrapper";
import { ContactEditor } from "@forms/collection";
import { useEntityList } from "@hooks/api";
import { usePermission } from "@hooks/auth";
import { initialContactInfo } from "@test/mock_data";
import { useSnackbar } from "notistack";
import { type FC, useCallback, useState } from "react";
import type { ContactInfoDT } from "@/api";
import { deleteEntity } from "@/api";
import contactInfoColumns from "../constants/contactInfoColumns";

const CONTACT_SUBHEADER = "Manage church contact information";

const ContactManagement: FC = () => {
	const { enqueueSnackbar } = useSnackbar();
	const { canCreate, canEdit, canDelete } = usePermission("contact_info");
	const {
		data: queryData,
		isLoading,
		refetch,
	} = useEntityList<ContactInfoDT>("contact_info");

	const [createContactOpen, setCreateContactOpen] =
		useState<Partial<ContactInfoDT> | null>(null);

	const _handleDeleteContact = useCallback(
		(data: Partial<ContactInfoDT>) => {
			deleteEntity("contact_info", data?.id as number)
				.then(() => {
					refetch();
					enqueueSnackbar("Contact deleted successfully", {
						variant: "success",
					});
				})
				.catch((error) => {
					console.error("Failed to delete contact:", error);
					enqueueSnackbar("Failed to delete contact", {
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
				subtitle={CONTACT_SUBHEADER}
				handleClick={
					canCreate ? () => setCreateContactOpen(initialContactInfo) : undefined
				}
			/>

			<DataTable
				isLoading={isLoading}
				data={queryData as Partial<ContactInfoDT>[]}
				columns={contactInfoColumns}
				onEdit={canEdit ? setCreateContactOpen : undefined}
				onDelete={canDelete ? _handleDeleteContact : undefined}
			/>

			{createContactOpen && (
				<ContactEditor
					open={!!createContactOpen}
					data={createContactOpen as ContactInfoDT}
					onClose={() => setCreateContactOpen(null)}
					onSuccess={() => {
						refetch();
						setCreateContactOpen(null);
					}}
				/>
			)}
		</>
	);
};

export default ContactManagement;
