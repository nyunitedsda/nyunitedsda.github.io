import Stack from "@mui/material/Stack";
import type { SxProps, Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useQuery } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { type FC, useCallback, useState } from "react";
import { deleteEntity } from "../../../api/request/commonMutations";
import { getDatabaseList } from "../../../api/request/commonQueries";
import type { DonationType } from "../../../api/request/types";
import ConfirmationDialog from "../../../components/ConfirmationDialog/ConfirmationDialog";
import RingLoader from "../../../components/Loaders/RingLoader";
import PageTitle from "../../../components/PageWrapper/PageTitle";
import DonationEditor from "../../../forms/collection/DonationEditor/DonationEditor";
import DonationItem from "../../Donations/components/DonationItem";

const listSx: SxProps<Theme> = {
	p: 2,
	overflowX: "hidden",
	margin: "0 auto",
	overflowY: "auto",
	width: "100%",
	alignItems: "center",
	gap: 1,
};

const DONATION_HEADER = "Donation Management";
const DONATION_SUBHEADER = "Manage your donation methods";
const DONATION_TEXT =
	"Here you can view and manage the donation methods available for your project.";
const DELETE_ITEM_TITLE = "Delete Donation Method";
const DELETE_CONFIRMATION_TEXT =
	"Are you sure you want to delete this donation method? This action cannot be undone.";
const EMPTY_DONATIONS_TEXT = "No donation methods available.";

const DonationAdmin: FC = () => {
	const { enqueueSnackbar } = useSnackbar();

	const [selectedItem, setSelectedItem] = useState<
		Partial<DonationType> | undefined
	>();
	const [deleteItemId, setDeleteItemId] = useState<number | undefined>();

	const { isLoading, data } = useQuery({
		queryKey: ["admin-donations"],
		queryFn: async () => await getDatabaseList<DonationType>("donations"),
	});

	const _handleDelete = useCallback(async (id: number) => {
		try {
			const res: { success: boolean } = await deleteEntity("donations", id);
			if (res?.success) {
				enqueueSnackbar("Donation method deleted successfully", {
					variant: "success",
				});
			}
		} catch (error) {
			enqueueSnackbar(String(error), { variant: "error" });
		}
	}, []);

	return (
		<>
			<PageTitle
				title={DONATION_HEADER}
				subtitle={DONATION_SUBHEADER}
				handleClick={() => setSelectedItem({ title: "", description: "" })}
			/>
			<Stack spacing={2}>
				<Typography color="text.primary">{DONATION_TEXT}</Typography>
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
						{data?.data?.length === 0 ? (
							<Typography color="text.secondary" variant="body2">
								{EMPTY_DONATIONS_TEXT}
							</Typography>
						) : (
							data?.data?.map((i) => (
								<DonationItem
									key={i.id}
									title={i.title}
									subtitle={i.description}
									onEdit={() => setSelectedItem(i)}
									onDelete={() => setDeleteItemId(i.id)}
								/>
							))
						)}
					</Stack>
				)}

				{!isLoading && selectedItem && (
					<DonationEditor
						open={!!selectedItem}
						entity={selectedItem}
						onClose={() => setSelectedItem(undefined)}
					/>
				)}
				{deleteItemId && (
					<ConfirmationDialog
						title={DELETE_ITEM_TITLE}
						content={DELETE_CONFIRMATION_TEXT}
						open={!!deleteItemId}
						onConfirm={() => {
							_handleDelete(deleteItemId);
							setDeleteItemId(undefined);
						}}
						onClose={() => setDeleteItemId(undefined)}
					/>
				)}
			</Stack>
		</>
	);
};

export default DonationAdmin;
