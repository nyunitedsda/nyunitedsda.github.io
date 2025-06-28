import Stack from "@mui/material/Stack";
import type { SxProps, Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { useCallback, useState } from "react";
import { deleteEntity } from "../../api/request/commonMutations";
import { getDatabaseList } from "../../api/request/commonQueries";
import ConfirmationDialog from "../ConfirmationDialog/ConfirmationDialog";
import RingLoader from "../Loaders/RingLoader";
import PageTitle from "../PageWrapper/PageTitle";
import type { EntityManagerProps } from "./types";

const listSx: SxProps<Theme> = {
	p: 2,
	overflowX: "hidden",
	margin: "0 auto",
	overflowY: "auto",
	width: "100%",
	alignItems: "center",
	height: "100%",
	flexWrap: "wrap",
	gap: 1,
};

const EntityManager = <
	T extends { id: number; title?: string; message?: string },
>({
	entityName,
	queryKey,
	title,
	subtitle,
	emptyText = `No ${entityName} available.`,
	deleteConfirmation,
	ItemComponent,
	EditorComponent,
	getItemTitle,
	getItemSubtitle,
	createNewEntity,
	successMessages,
}: EntityManagerProps<T>) => {
	const { enqueueSnackbar } = useSnackbar();
	const queryClient = useQueryClient();

	const [selectedItem, setSelectedItem] = useState<Partial<T> | undefined>();
	const [deleteItemId, setDeleteItemId] = useState<number | undefined>();

	const { isLoading, data } = useQuery({
		queryKey: [queryKey],
		queryFn: async () => await getDatabaseList<T>(entityName),
	});

	const handleDelete = useCallback(
		async (id: number) => {
			try {
				const res = await deleteEntity(entityName, id);
				if (res) {
					enqueueSnackbar(
						successMessages?.delete || `${entityName} deleted successfully`,
						{ variant: "success" },
					);
					queryClient.invalidateQueries({ queryKey: [queryKey] });
				}
			} catch (error) {
				enqueueSnackbar(`Failed to delete ${entityName}: ${String(error)}`, {
					variant: "error",
				});
			}
		},
		[enqueueSnackbar, queryClient, entityName, queryKey, successMessages],
	);

	const handleEditorSuccess = useCallback(() => {
		queryClient.invalidateQueries({ queryKey: [queryKey] });
		setSelectedItem(undefined);
		enqueueSnackbar(
			successMessages?.save || `${entityName} saved successfully`,
			{ variant: "success" },
		);
	}, [queryClient, enqueueSnackbar, queryKey, entityName, successMessages]);

	return (
		<>
			<PageTitle
				title={title}
				subtitle={subtitle}
				handleClick={() => setSelectedItem(createNewEntity())}
			/>
			<Stack
				spacing={2}
				sx={{
					...listSx,
					justifyContent:
						!isLoading && data?.data && data?.data?.length > 0
							? "flex-start"
							: "center",
				}}
			>
				{isLoading && <RingLoader />}

				{!isLoading &&
					(data?.data && (data?.data?.length ?? 0) > 0 ? (
						data.data.map((item) => (
							<ItemComponent
								key={item.id}
								title={getItemTitle(item)}
								subtitle={getItemSubtitle(item)}
								onEdit={() => setSelectedItem(item)}
								onDelete={() => setDeleteItemId(item.id)}
							/>
						))
					) : (
						<Typography color="text.secondary" variant="body2">
							{emptyText}
						</Typography>
					))}
			</Stack>

			{selectedItem && (
				<EditorComponent
					open={!!selectedItem}
					entity={selectedItem}
					onClose={() => setSelectedItem(undefined)}
					onSuccess={handleEditorSuccess}
				/>
			)}

			{deleteItemId && (
				<ConfirmationDialog
					title={deleteConfirmation.title}
					content={deleteConfirmation.message}
					open={!!deleteItemId}
					onConfirm={() => {
						handleDelete(deleteItemId);
						setDeleteItemId(undefined);
					}}
					onClose={() => setDeleteItemId(undefined)}
				/>
			)}
		</>
	);
};

export default EntityManager;
