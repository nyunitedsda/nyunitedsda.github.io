import { useQuery } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { useCallback, useState, type FC } from "react";
import { getDatabaseList } from "../../../api/request/commonQueries";
import { deleteEntity } from "../../../api/request/mutations";
import type { AnnouncementType } from "../../../api/request/types";
import DataTable from "../../../components/DataTable/DataTable";
import type { GenericType } from "../../../components/DataTable/types";
import PageTitle from "../../../components/PageWrapper/PageTitle";
import AnnouncementEditor from "../../../forms/collection/AnnouncementEditor/AnnouncementEditor";
import usePermission from "../../../hooks/auth/usePermission";
import useToken from "../../../hooks/auth/useToken";
import { initialAnnouncement } from "../../../test/mock_data/announcements";
import { createAuthConfig } from "../../../utils/authUtils";
import announcementColumns from "../constants/announcementColumns";
import RingLoader from "../../../components/Loaders/RingLoader";

const SUBHEADER = "Manage church announcements and events";

const AnnouncementManagement: FC = () => {
	const { accessToken } = useToken();
	const { canCreate, canEdit, canDelete } = usePermission("user");
	const { enqueueSnackbar } = useSnackbar();

	const [editorContent, setEditorContent] =
		useState<Partial<AnnouncementType> | null>(null);

	const {
		data: queryData,
		refetch,
		isLoading,
	} = useQuery<Partial<AnnouncementType>[] | undefined>({
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

	const _handleDelete = useCallback((d: Pick<AnnouncementType, "id">) => {
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
	}, []);

	return (
		<>
			<PageTitle
				title=""
				subtitle={SUBHEADER}
				handleClick={
					canCreate ? () => setEditorContent(initialAnnouncement) : undefined
				}
			/>

			{!isLoading ? (
				<DataTable
					columns={announcementColumns}
					data={queryData as GenericType[]}
					onDelete={canDelete ? _handleDelete : undefined}
					onEdit={canEdit ? setEditorContent : undefined}
				/>
			) : (
				<RingLoader />
			)}

			{editorContent && (
				<AnnouncementEditor
					open={!!editorContent}
					data={editorContent as AnnouncementType}
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
