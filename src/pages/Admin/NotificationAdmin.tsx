import Stack from "@mui/material/Stack";
import type { SxProps, Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { type FC, useCallback, useState } from "react";
import { deleteEntity } from "../../api/request/commonMutations";
import { getDatabaseList } from "../../api/request/commonQueries";
import type { NotificationType } from "../../api/request/types";
import ConfirmationDialog from "../../components/ConfirmationDialog/ConfirmationDialog";
import RingLoader from "../../components/Loaders/RingLoader";
import PageTitle from "../../components/PageWrapper/PageTitle";
import DonationItem from "../Donations/components/DonationItem";
import NotificationEditor from "../../forms/collection/NotificationEditor/NotificationEditor";

const listSx: SxProps<Theme> = {
	p: 2,
	overflowX: "hidden",
	margin: "0 auto",
	overflowY: "auto",
	width: "100%",
	alignItems: "center",
	gap: 1,
};

const NOTIFICATION_HEADER = "Notification Management";
const NOTIFICATION_SUBHEADER = "Manage application notifications";
const NOTIFICATION_TEXT =
	"Here you can create, edit, and delete notifications that will be displayed to users.";
const DELETE_ITEM_TITLE = "Delete Notification";
const DELETE_CONFIRMATION_TEXT =
	"Are you sure you want to delete this notification? This action cannot be undone.";
const EMPTY_NOTIFICATIONS_TEXT = "No notifications available.";

const NotificationAdmin: FC = () => {
	const { enqueueSnackbar } = useSnackbar();
	const queryClient = useQueryClient();

	const [selectedItem, setSelectedItem] = useState<
		Partial<NotificationType> | undefined
	>();
	const [deleteItemId, setDeleteItemId] = useState<number | undefined>();

	const { isLoading, data } = useQuery({
		queryKey: ["admin-notifications"],
		queryFn: async () =>
			await getDatabaseList<NotificationType>("notifications"),
	});

	const handleDelete = useCallback(
		async (id: number) => {
			try {
				const res = await deleteEntity("notifications", id);
				if (res) {
					enqueueSnackbar("Notification deleted successfully", {
						variant: "success",
					});
					// Refresh the notifications list
					queryClient.invalidateQueries({ queryKey: ["admin-notifications"] });
				}
			} catch (error) {
				enqueueSnackbar(`Failed to delete notification: ${String(error)}`, {
					variant: "error",
				});
			}
		},
		[enqueueSnackbar, queryClient],
	);

	const handleEditorSuccess = useCallback(() => {
		// Refresh the data after create/edit
		queryClient.invalidateQueries({ queryKey: ["admin-notifications"] });
		setSelectedItem(undefined);
		enqueueSnackbar("Notification saved successfully", { variant: "success" });
	}, [queryClient, enqueueSnackbar]);

	return (
		<>
			<PageTitle
				title={NOTIFICATION_HEADER}
				subtitle={NOTIFICATION_SUBHEADER}
				handleClick={() => setSelectedItem({ title: "", message: "" })}
			/>
			<Stack spacing={2}>
				<Typography color="text.primary">{NOTIFICATION_TEXT}</Typography>

				{isLoading && (
					<Stack width="100%" height="100%" justifyContent="center">
						<RingLoader />
					</Stack>
				)}

				{!isLoading && (
					<Stack
						alignItems="center"
						spacing={1}
						flexWrap="wrap"
						width="100%"
						sx={listSx}
					>
						{data?.data?.length ? (
							data.data.map((notification) => (
								<DonationItem
									key={notification.id}
									title={notification?.title as string}
									subtitle={notification.message}
									onEdit={() => setSelectedItem(notification)}
									onDelete={() => setDeleteItemId(notification.id)}
								/>
							))
						) : (
							<Typography color="text.secondary" variant="body2">
								{EMPTY_NOTIFICATIONS_TEXT}
							</Typography>
						)}
					</Stack>
				)}

				{selectedItem && (
					<NotificationEditor
						open={!!selectedItem}
						entity={selectedItem}
						onClose={() => setSelectedItem(undefined)}
						onSuccess={handleEditorSuccess}
					/>
				)}

				{deleteItemId && (
					<ConfirmationDialog
						title={DELETE_ITEM_TITLE}
						content={DELETE_CONFIRMATION_TEXT}
						open={!!deleteItemId}
						onConfirm={() => {
							handleDelete(deleteItemId);
							setDeleteItemId(undefined);
						}}
						onClose={() => setDeleteItemId(undefined)}
					/>
				)}
			</Stack>
		</>
	);
};

export default NotificationAdmin;
