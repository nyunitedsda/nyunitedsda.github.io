import { useQuery } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { type FC, useCallback, useState } from "react";
import type { ContactInfoDT } from "../../../api/request";
import { getDatabaseList } from "../../../api/request/commonQueries";
import { deleteEntity } from "../../../api/request/mutations";
import DataTable from "../../../components/DataTable/DataTable";
import PageTitle from "../../../components/PageWrapper/PageTitle";
import ContactEditor from "../../../forms/collection/ContactEditor/ContactEditor";
import usePermission from "../../../hooks/auth/usePermission";
import { initialContactInfo } from "../../../test/mock_data";
import contactInfoColumns from "../constants/contactInfoColumns";

const CONTACT_SUBHEADER = "Manage church contact information";

const ContactManagement: FC = () => {
	const { enqueueSnackbar } = useSnackbar();
	const { canCreate, canEdit, canDelete } = usePermission("contact_info");

	const [createContactOpen, setCreateContactOpen] =
		useState<Partial<ContactInfoDT> | null>(null);

	const {
		data: queryData,
		refetch,
		isLoading,
	} = useQuery<ContactInfoDT[] | undefined>({
		queryKey: ["contacts"],
		queryFn: () => getDatabaseList("contact_info"),
		staleTime: 5 * 60 * 1000,
		refetchOnWindowFocus: false,
	});

	const _handleDeleteContact = useCallback(
		(data: ContactInfoDT) => {
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
		[refetch],
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
