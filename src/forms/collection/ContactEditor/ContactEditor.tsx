import { type FC, useMemo } from "react";
import type { Contact_InfoDT } from "../../../api/request/types";
import ProjectModal from "../../../components/ProjectModal/ProjectModal";
import { initialContactInfo } from "../../../test/mock_data";
import EntityEditor from "../../EntityEditor/EntityEditor";
import InputField from "../../Input/FormField";
import type { EditorProps } from "../types";
import { CONTACT_EDITOR_CONSTANTS } from "./constants";
import contactSchema from "./schema";

const {
	EDIT_TITLE,
	ADD_TITLE,
	ENTITY_NAME,
	BUTTON_TEXT,
	EMAIL_LABEL,
	PHONE_LABEL,
	STREET_LABEL,
	CITY_LABEL,
	ZIP_CODE_LABEL,
	COUNTRY_LABEL,
	MAIL_ADDRESS_LABEL,
	MAILING_RECIPIENT_LABEL,
} = CONTACT_EDITOR_CONSTANTS;

const ContactEditor: FC<EditorProps<Contact_InfoDT>> = ({
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
						initialValues: initialContactInfo,
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
				validationSchema={contactSchema}
				onCancel={onClose}
				onSuccess={(data) => {
					console.log("Contact information saved successfully:", data);
					if (onSuccess) {
						onSuccess(data as Contact_InfoDT);
					}
				}}
			>
				<InputField
					name="email"
					label={EMAIL_LABEL}
					fieldType="text"
					placeholder="Enter email address"
				/>

				<InputField
					name="phone"
					label={PHONE_LABEL}
					fieldType="text"
					placeholder="Enter phone number"
				/>

				<InputField
					name="street"
					label={STREET_LABEL}
					fieldType="text"
					placeholder="Enter street address"
				/>

				<InputField
					name="city"
					label={CITY_LABEL}
					fieldType="text"
					placeholder="Enter city"
				/>

				<InputField
					name="zip_code"
					label={ZIP_CODE_LABEL}
					fieldType="text"
					placeholder="Enter ZIP/postal code"
				/>

				<InputField
					name="country"
					label={COUNTRY_LABEL}
					fieldType="text"
					placeholder="Enter country"
				/>

				<InputField
					name="mail_address"
					label={MAIL_ADDRESS_LABEL}
					fieldType="text"
					placeholder="Enter mailing address (optional)"
				/>

				<InputField
					name="mailing_recipient"
					label={MAILING_RECIPIENT_LABEL}
					fieldType="text"
					placeholder="Enter mailing recipient name (optional)"
				/>

				<InputField
					name="is_default"
					label="Default Contact"
					fieldType="checkbox"
					placeholder="Set as default contact"
				/>
			</EntityEditor>
		</ProjectModal>
	);
};

export default ContactEditor;
