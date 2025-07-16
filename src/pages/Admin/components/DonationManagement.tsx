import type { FC } from "react";
import type { DonationType } from "../../../api/request/types";
import EntityManager from "../../../components/EntityManager";
import DonationEditor from "../../../forms/collection/DonationEditor/DonationEditor";
import DonationItem from "../../Donations/components/DonationItem";

const DONATION_SUBHEADER = "Manage your donation methods";
const DELETE_ITEM_TITLE = "Delete Donation Method";
const DELETE_CONFIRMATION_TEXT =
	"Are you sure you want to delete this donation method? This action cannot be undone.";
const EMPTY_DONATIONS_TEXT = "No donation methods available.";

// Wrapper component to handle type compatibility
const WrappedDonationEditor = ({
	open,
	data,
	onClose,
}: {
	open: boolean;
	data?: Partial<DonationType>;
	onClose: () => void;
	onSuccess?: (data?: DonationType) => void;
}) => (
	<DonationEditor
		open={open}
		data={data as DonationType}
		onClose={onClose}
	/>
);

const DonationAdmin: FC = () => {
	return (
		<EntityManager<DonationType>
			entityName="donations"
			queryKey="admin-donations"
			title=""
			subtitle={DONATION_SUBHEADER}
			emptyText={EMPTY_DONATIONS_TEXT}
			deleteConfirmation={{
				title: DELETE_ITEM_TITLE,
				message: DELETE_CONFIRMATION_TEXT,
			}}
			ItemComponent={DonationItem}
			EditorComponent={WrappedDonationEditor}
			getItemTitle={(donation: DonationType) => donation?.title as string}
			getItemSubtitle={(donation: DonationType) =>
				donation.description as string
			}
			createNewEntity={() => ({ title: "", description: "" })}
			successMessages={{
				save: "Donation method saved successfully",
				delete: "Donation method deleted successfully",
			}}
		/>
	);
};

export default DonationAdmin;
