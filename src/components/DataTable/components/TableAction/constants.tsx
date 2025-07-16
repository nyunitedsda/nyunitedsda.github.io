import type { ConfirmationButtonProps } from "../../../Buttons/types";

const tableActions: Record<string, Partial<ConfirmationButtonProps>> = {
	deleteConfirm: {
		cancelLabel: "Cancel",
		color: "error" as ConfirmationButtonProps["color"],
		confirmationContent:
			"This item will be permanently deleted. Are you sure you want to delete this item?",
		confirmationTitle: "Delete Confirmation",
		confirmLabel: "Delete",
		shouldConfirm: true,
		title: "Delete",
	},
	editConfirm: {
		color: "primary" as ConfirmationButtonProps["color"],
		shouldConfirm: false,
		title: "Edit",
	},
	viewConfirm: {
		color: "primary" as ConfirmationButtonProps["color"],
		shouldConfirm: false,
		title: "View",
	},
};

export { tableActions };
