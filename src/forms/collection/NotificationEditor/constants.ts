import type { Palette } from "@mui/material/styles";
import * as Yup from "yup";
import type { DatabaseEntity } from "@/api";

export const notificationSchema = Yup.object().shape({
	title: Yup.string().required("Title is required"),
	message: Yup.string().required("Message is required"),
	severity: Yup.number().oneOf([1, 2, 3, 4], "Invalid severity level"),
	expires_at: Yup.date().nullable(),
});

export const NOTIFICATION_EDITOR_CONSTANTS = {
	EDIT_TITLE: "Edit Notification",
	ADD_TITLE: "Add Notification",
	ENTITY_NAME: "notifications" as DatabaseEntity,
	BUTTON_TEXT: "Save",
	TITLE_FIELD_LABEL: "Notification Title",
	MESSAGE_FIELD_LABEL: "Notification Message",
	SEVERITY_FIELD_LABEL: "Severity Level",
	EXPIRATION_FIELD_LABEL: "Expiration Date (Optional)",
	SEVERITY_PALETTE_KEY: {
		information: "info",
		caution: "warning",
		error: "error",
		success: "success",
	} as Record<string, keyof Palette>,
};
