import type { ServiceDT } from "@/api";
import ProjectModal from "@components/ProjectModal/ProjectModal";
import { type EditorProps, serviceSchema } from "@forms/collection";
import { EntityEditor } from "@forms/EntityEditor";
import InputField from "@forms/Input/FormField";
import { initialService } from "@test/mock_data";
import { type FC, useMemo } from "react";

const EDIT_TITLE = "Edit Service";
const ADD_TITLE = "Add Service";
const ENTITY_NAME = "services";
const BUTTON_TEXT = "Save";
const TITLE_FIELD_LABEL = "Title";
const TIME_LABEL = "Service Time";

const ServiceEditor: FC<EditorProps<ServiceDT>> = ({
	open,
	data,
	onClose,
	onSuccess,
}) => {
	const { initialValues, title } = useMemo(
		() =>
			data && Object.hasOwn(data, "id")
				? {
						initialValues: data,
						title: EDIT_TITLE,
					}
				: {
						initialValues: initialService,
						title: ADD_TITLE,
					},
		[data],
	);

	return (
		<ProjectModal open={open} onClose={onClose}>
			<EntityEditor
				defaultValues={initialValues}
				entity={ENTITY_NAME}
				id={data?.id}
				submitButtonText={BUTTON_TEXT}
				title={title}
				validationSchema={serviceSchema}
				onCancel={onClose}
				onSuccess={(data) => {
					console.log("Service saved successfully:", data);
					if (onSuccess) {
						onSuccess(data as ServiceDT);
					}
				}}
			>
				<InputField
					name="title"
					label={TITLE_FIELD_LABEL}
					fieldType="text"
					placeholder="Enter service title"
				/>

				<InputField
					name="time"
					label={TIME_LABEL}
					fieldType="datetime-local"
					placeholder="Enter service time (e.g., 10:00 AM)"
				/>
				{/* Add a format selection input field */}
			</EntityEditor>
		</ProjectModal>
	);
};

export default ServiceEditor;
