import * as Yup from "yup";
import type { DatabaseEntity } from "../../../api/request";

export const donationSchema = Yup.object().shape({
	title: Yup.string().required("Title is required"),
	description: Yup.string().required("Description is required"),
});

export const DONATION_EDITOR_CONSTANTS = {
	EDIT_TITLE: "Edit Donation",
	ADD_TITLE: "Add Donation",
	ENTITY_NAME: "donations" as DatabaseEntity,
	BUTTON_TEXT: "Save",
	TITLE_FIELD_LABEL: "How would you like to title this donation?",
	DESCRIPTION_FIELD_LABEL: "Please describe the donation method",
};
