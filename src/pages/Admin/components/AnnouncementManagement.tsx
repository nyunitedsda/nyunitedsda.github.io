import { useQueries } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { type FC, useCallback, useMemo, useState } from "react";
import { getDatabaseList } from "../../../api/request/commonQueries";
import type {
	AnnouncementDT,
	EventDT,
} from "../../../api/request/databaseTypes";
import { deleteEntity } from "../../../api/request/mutations";
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

	const result = useQueries({
		queries: [
			{
				queryKey: ["announcements"],
				queryFn: async () => {
					return await getDatabaseList("announcements");
				},
				staleTime: 5 * 60 * 1000,
				refetchOnWindowFocus: false,
			},
			{
				queryKey: ["events"],
				queryFn: async () => {
					return await getDatabaseList("events");
				},
				staleTime: 5 * 60 * 1000,
				refetchOnWindowFocus: false,
			},
		],
	});

	const tableColumns = useMemo(() => {
		const eventData = result[1].data as EventDT[] | undefined;
		if (!eventData) {
			return announcementColumns;
		}

		return announcementColumns.map((column) =>
			column.field === "event_id"
				? {
						...column,
						renderCell(data: Partial<AnnouncementDT>) {
							const event = eventData.find((e) => e.id === data.event_id);
							return event ? event.name : "N/A";
						},
					}
				: column,
		);
	}, [result]);

	const _handleDelete = useCallback(
		(d: AnnouncementDT & { id: number }) => {
			deleteEntity("announcements", d.id, createAuthConfig(accessToken))
				.then(() => {
					result[0].refetch();
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
		[accessToken, enqueueSnackbar, result],
	);

	return (
		<>
			<PageTitle
				title=""
				subtitle={SUBHEADER}
				handleClick={
					canCreate
						? () => setEditorContent(initialAnnouncement as AnnouncementDT)
						: undefined
				}
			/>

			{result[0].isLoading ? (
				<RingLoader />
			) : (
				<DataTable
					isLoading={result[0].isLoading}
					columns={tableColumns}
					data={(result[0].data ?? []) as unknown as GenericType[]}
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
						result[0].refetch();
						setEditorContent(null);
					}}
				/>
			)}
		</>
	);
};

export default AnnouncementManagement;
