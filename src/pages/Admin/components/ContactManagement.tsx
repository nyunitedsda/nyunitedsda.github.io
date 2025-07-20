import { useQuery } from "@tanstack/react-query";
import { type FC, useCallback, useEffect, useState } from "react";
import { getDatabaseList } from "../../../api/request/commonQueries";
import { deleteEntity } from "../../../api/request/mutations";
import type { ContactInfoType } from "../../../api/request/types";
import DataTable from "../../../components/DataTable/DataTable";
import PageTitle from "../../../components/PageWrapper/PageTitle";
import ContactEditor from "../../../forms/collection/ContactEditor/ContactEditor";
import useToken from "../../../hooks/auth/useToken";
import { initialContactInfo } from "../../../test/mock_data/contactInfo";
import { createAuthConfig } from "../../../utils/authUtils";
import contactInfoColumns from "../constants/contactInfoColumns";

const CONTACT_SUBHEADER = "Manage church contact information";

const ContactManagement: FC = () => {
	const [contactData, setContactData] = useState<Partial<ContactInfoType>[]>(
		[],
	);
	const [createContactOpen, setCreateContactOpen] =
		useState<Partial<ContactInfoType> | null>(null);
	const { accessToken } = useToken();

	const { data: queryData, refetch } = useQuery<
		{ data: ContactInfoType[] } | undefined
	>({
		queryKey: ["contacts"],
		queryFn: () => getDatabaseList("contacts", createAuthConfig(accessToken)),
		staleTime: 5 * 60 * 1000,
		refetchOnWindowFocus: false,
	});

	useEffect(() => {
		if (queryData && Array.isArray(queryData.data)) {
			setContactData(queryData.data);
		}
	}, [queryData]);

	const _handleDeleteContact = useCallback((id: number) => {
		deleteEntity("contacts", id, createAuthConfig(accessToken))
			.then(() => {
				setContactData((prev) => prev.filter((contact) => contact?.id !== id));
			})
			.catch((error) => {
				console.error("Failed to delete contact:", error);
			});
	}, []);

	return (
		<>
			<PageTitle
				title=""
				subtitle={CONTACT_SUBHEADER}
				handleClick={() => setCreateContactOpen(initialContactInfo)}
			/>

			<DataTable
				data={contactData}
				columns={contactInfoColumns}
				onEdit={(d) => setCreateContactOpen(d)}
				onDelete={(d) => _handleDeleteContact(d?.id as number)}
				onView={(d) => setCreateContactOpen(d)}
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
