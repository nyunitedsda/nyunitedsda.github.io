import { type FC, useMemo } from "react";
import * as Yup from "yup";
import ProjectModal from "../../../components/ProjectModal/ProjectModal";
import { initialDonation } from "../../../test/mock_data/donations";
import EntityEditor from "../../EntityEditor/EntityEditor";
import InputField from "../../Input/FormField";
import type { DonationEditorProps } from "./types";

const donationSchema = Yup.object().shape({
	title: Yup.string().required("Title is required"),
	description: Yup.string().required("Description is required"),
});

const EDIT_TITLE = "Edit Donation";
const ADD_TITLE = "Add Donation";
const ENTITY_NAME = "donations";
const BUTTON_TEXT = "Save";
const TITLE_FIELD_LABEL = "How would you like to title this donation?";
const DESCRIPTION_FIELD_LABEL = "Please describe the donation method";

const DonationEditor: FC<DonationEditorProps> = ({ open, data, onClose }) => {
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
				data={ENTITY_NAME}
				id={data?.id}
				submitButtonText={BUTTON_TEXT}
				title={title}
				validationSchema={donationSchema}
				onCancel={onClose}
				onSuccess={(data) => {
					console.log("Donation saved successfully:", data);
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
