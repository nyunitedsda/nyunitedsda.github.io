import { type FC, useMemo } from "react";
import type { ServiceType } from "../../../api/request/types";
import ProjectModal from "../../../components/ProjectModal/ProjectModal";
import EntityEditor from "../../EntityEditor/EntityEditor";
import InputField from "../../Input/FormField";
import type { EditorProps } from "../types";
import serviceSchema from "./schema";

const EDIT_TITLE = "Edit Service";
const ADD_TITLE = "Add Service";
const ENTITY_NAME = "services";
const BUTTON_TEXT = "Save";
const TITLE_FIELD_LABEL = "Title";
const TIME_LABEL = "Service Time";

const defaultValues: Partial<ServiceType> = {
	title: "",
	time: "",
};

const ServiceEditor: FC<EditorProps<ServiceType>> = ({
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
				validationSchema={serviceSchema}
				onCancel={onClose}
				onSuccess={(data) => {
					console.log("Service saved successfully:", data);
					if (onSuccess) {
						onSuccess(data as ServiceType);
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
					fieldType="text"
					placeholder="Enter service time (e.g., 10:00 AM)"
				/>
			</EntityEditor>
		</ProjectModal>
	);
};

export default ServiceEditor;
