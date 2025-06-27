import { type FC, useMemo } from "react";
import * as Yup from "yup";
import type {
	NotificationSeverityOption,
	NotificationType,
} from "../../../api/request/types";
import ProjectModal from "../../../components/ProjectModal/ProjectModal";
import EntityEditor from "../../EntityEditor/EntityEditor";
import { default as InputField } from "../../Input/FormField";
import type { EditorProps } from "../types";

const defaultValues: Partial<NotificationType> = {
	title: "",
	message: "",
	severity: "information",
};

const notificationSchema = Yup.object().shape({
	title: Yup.string().required("Title is required"),
	message: Yup.string().required("Message is required"),
	severity: Yup.string().oneOf(
		["information", "caution", "error", "success"],
		"Invalid severity level",
	),
	expires_at: Yup.date().nullable(),
});

const EDIT_TITLE = "Edit Notification";
const ADD_TITLE = "Add Notification";
const ENTITY_NAME = "notifications";
const BUTTON_TEXT = "Save";
const TITLE_FIELD_LABEL = "Notification Title";
const MESSAGE_FIELD_LABEL = "Notification Message";
const SEVERITY_FIELD_LABEL = "Severity Level";
const EXPIRATION_FIELD_LABEL = "Expiration Date (Optional)";

const severityOptions: NotificationSeverityOption[] = [
	{ id: 1, value: "information", label: "Information" },
	{ id: 2, value: "caution", label: "Caution" },
	{ id: 3, value: "error", label: "Error" },
	{ id: 4, value: "success", label: "Success" },
];

const NotificationEditor: FC<EditorProps<Partial<NotificationType>>> = ({
	open,
	entity,
	onClose,
	onSuccess,
}) => {
	const { initialValues, title } = useMemo(
		() =>
			entity && Object.hasOwn(entity, "id")
				? {
						initialValues: entity,
						title: EDIT_TITLE,
					}
				: {
						initialValues: defaultValues,
						title: ADD_TITLE,
					},
		[entity],
	);

	return (
		<ProjectModal open={open} onClose={onClose}>
			<EntityEditor
				defaultValues={initialValues}
				entity={ENTITY_NAME}
				id={entity?.id}
				submitButtonText={BUTTON_TEXT}
				title={title}
				validationSchema={notificationSchema}
				onCancel={onClose}
				onSuccess={(data) => {
					console.log("Notification saved successfully:", data);
					if (onSuccess) {
						onSuccess(data as NotificationType);
					}
				}}
			>
				<InputField name="title" label={TITLE_FIELD_LABEL} fieldType="text" />

				<InputField
					name="message"
					label={MESSAGE_FIELD_LABEL}
					fieldType="text"
					multiline
					minRows={4}
				/>

				<InputField
					name="severity"
					label={SEVERITY_FIELD_LABEL}
					fieldType="select"
					items={severityOptions}
					renderItemLabel={(item) => item.label}
					valueResolver={(item) => item.value}
				/>

				<InputField
					name="expires_at"
					label={EXPIRATION_FIELD_LABEL}
					fieldType="datetime-local"
				/>
			</EntityEditor>
		</ProjectModal>
	);
};

export default NotificationEditor;
