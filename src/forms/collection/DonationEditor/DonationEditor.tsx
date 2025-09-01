import { ProjectModal } from "@components/ProjectModal";
import {
	DONATION_EDITOR_CONSTANTS,
	donationSchema,
	type DonationEditorProps,
} from "@forms/collection";
import { EntityEditor } from "@forms/EntityEditor";
import { InputField } from "@forms/Input";
import { initialDonation } from "@test/mock_data";
import { useMemo, type FC } from "react";

const {
	EDIT_TITLE,
	ADD_TITLE,
	ENTITY_NAME,
	BUTTON_TEXT,
	TITLE_FIELD_LABEL,
	DESCRIPTION_FIELD_LABEL,
} = DONATION_EDITOR_CONSTANTS;

const DonationEditor: FC<DonationEditorProps> = ({
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
						initialValues: initialDonation,
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
				validationSchema={donationSchema}
				onCancel={onClose}
				onSuccess={(data) => {
					onSuccess?.(data);
					onClose();
				}}
			>
				<InputField name="title" label={TITLE_FIELD_LABEL} fieldType="text" />
				<InputField
					name="description"
					label={DESCRIPTION_FIELD_LABEL}
					fieldType="text"
					multiline
					minRows={4}
				/>
			</EntityEditor>
		</ProjectModal>
	);
};

export default DonationEditor;
