import { useQuery } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { type FC, useCallback, useState } from "react";
import { getDatabaseList } from "../../../api/request/commonQueries";
import { deleteEntity } from "../../../api/request/mutations";
import type { ContactInfoType } from "../../../api/request/types";
import DataTable from "../../../components/DataTable/DataTable";
import type { GenericType } from "../../../components/DataTable/types";
import PageTitle from "../../../components/PageWrapper/PageTitle";
import ContactEditor from "../../../forms/collection/ContactEditor/ContactEditor";
import useToken from "../../../hooks/auth/useToken";
import { initialContactInfo } from "../../../test/mock_data/contactInfo";
import { createAuthConfig } from "../../../utils/authUtils";
import contactInfoColumns from "../constants/contactInfoColumns";
import usePermission from "../../../hooks/auth/usePermission";

const CONTACT_SUBHEADER = "Manage church contact information";

const ContactManagement: FC = () => {
	const { accessToken } = useToken();
	const { enqueueSnackbar } = useSnackbar();
	const { canCreate, canEdit, canDelete } = usePermission("contact_info");

	const [createContactOpen, setCreateContactOpen] =
		useState<Partial<ContactInfoType> | null>(null);

	const { data: queryData, refetch } = useQuery<ContactInfoType[] | undefined>({
		queryKey: ["contacts"],
		queryFn: () =>
			getDatabaseList("contact_info", createAuthConfig(accessToken)),
		staleTime: 5 * 60 * 1000,
		refetchOnWindowFocus: false,
	});

	const _handleDeleteContact = useCallback(
		(data: GenericType) => {
			deleteEntity(
				"contact_info",
				data?.id as number,
				createAuthConfig(accessToken),
			)
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
		[accessToken],
	);

	return (
		<>
			<PageTitle
				title=""
				subtitle={CONTACT_SUBHEADER}
				handleClick={canCreate ? () => setCreateContactOpen(initialContactInfo) : undefined}
			/>

			<DataTable
				data={queryData as unknown as GenericType[]}
				columns={contactInfoColumns}
				onEdit={canEdit ? setCreateContactOpen : undefined}
				onDelete={canDelete ? _handleDeleteContact : undefined}
			/>

			{createContactOpen && (
				<ContactEditor
					open={!!createContactOpen}
					data={createContactOpen as ContactInfoType}
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
