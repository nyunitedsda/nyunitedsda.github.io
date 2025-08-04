import { useQuery } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { type FC, useCallback, useState } from "react";
import { getDatabaseList } from "../../../api/request/commonQueries";
import type { AnnouncementDT } from "../../../api/request/databaseTypes";
import { deleteEntity } from "../../../api/request/mutations";
import type { AnnouncementDT } from "../../../api/request/types";
import DataTable from "../../../components/DataTable/DataTable";
import type { GenericType } from "../../../components/DataTable/types";
import RingLoader from "../../../components/Loaders/RingLoader";
import PageTitle from "../../../components/PageWrapper/PageTitle";
import AnnouncementEditor from "../../../forms/collection/AnnouncementEditor/AnnouncementEditor";
import usePermission from "../../../hooks/auth/usePermission";
import useToken from "../../../hooks/auth/useToken";
import { initialAnnouncement } from "../../../test/mock_data";
import { createAuthConfig } from "../../../utils/authUtils";
import announcementColumns from "../constants/announcementColumns";

const SUBHEADER = "Manage church announcements and events";

const AnnouncementManagement: FC = () => {
	const { accessToken } = useToken();
	const { canCreate, canEdit, canDelete } = usePermission("announcements");
	const { enqueueSnackbar } = useSnackbar();

	const [editorContent, setEditorContent] =
		useState<Partial<AnnouncementDT> | null>(null);

	const {
		data: queryData,
		refetch,
		isLoading,
	} = useQuery<AnnouncementDT[] | undefined>({
		queryKey: ["announcements"],
		queryFn: async () => {
			return await getDatabaseList(
				"announcements",
				createAuthConfig(accessToken),
			);
		},
		staleTime: 5 * 60 * 1000,
		refetchOnWindowFocus: false,
		enabled: !!accessToken,
	});

	const _handleDelete = useCallback(
		(d: AnnouncementDT & { id: number }) => {
			deleteEntity("announcements", d.id, createAuthConfig(accessToken))
				.then(() => {
					refetch();
					enqueueSnackbar("Announcement deleted successfully", {
						variant: "success",
					});
				})
				.catch((error) => {
					console.error("Failed to delete announcement:", error);
					enqueueSnackbar("Failed to delete announcement", {
						variant: "error",
					});
				});
		},
		[accessToken, enqueueSnackbar, refetch],
	);

	return (
		<>
			<PageTitle
				title=""
				subtitle={SUBHEADER}
				handleClick={
					canCreate ? () => setEditorContent(initialAnnouncement) : undefined
				}
			/>

			{isLoading ? (
				<RingLoader />
			) : (
				<DataTable
					columns={announcementColumns}
					data={(queryData ?? []) as unknown as GenericType[]}
					onDelete={
						canDelete
							? (d) => _handleDelete(d as unknown as AnnouncementDT)
							: undefined
					}
					onEdit={canEdit ? setEditorContent : undefined}
				/>
			)}

			{editorContent && (
				<AnnouncementEditor
					open={!!editorContent}
					data={editorContent as AnnouncementDT}
					onClose={() => setEditorContent(null)}
					onSuccess={() => {
						refetch();
						setEditorContent(null);
					}}
				/>
			)}
		</>
	);
};

export default AnnouncementManagement;
