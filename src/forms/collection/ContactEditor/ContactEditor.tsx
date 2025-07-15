import { type FC, useMemo } from "react";
import type { ContactInfoType } from "../../../api/request/types";
import ProjectModal from "../../../components/ProjectModal/ProjectModal";
import EntityEditor from "../../EntityEditor/EntityEditor";
import InputField from "../../Input/FormField";
import type { EditorProps } from "../types";
import contactSchema from "./schema";

const EDIT_TITLE = "Edit Contact Information";
const ADD_TITLE = "Add Contact Information";
const ENTITY_NAME = "contacts";
const BUTTON_TEXT = "Save";
const EMAIL_LABEL = "Email";
const PHONE_LABEL = "Phone Number";
const STREET_LABEL = "Street Address";
const CITY_LABEL = "City";
const ZIP_CODE_LABEL = "ZIP Code";
const COUNTRY_LABEL = "Country";
const MAIL_ADDRESS_LABEL = "Mailing Address";
const MAILING_RECIPIENT_LABEL = "Mailing Recipient";

const defaultValues: Partial<ContactInfoType> = {
	email: "",
	phone: "",
	street: "",
	city: "",
	zip_code: "",
	country: "",
	mail_address: "",
	mailing_recipient: "",
};

const ContactEditor: FC<EditorProps<ContactInfoType>> = ({
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
				validationSchema={contactSchema}
				onCancel={onClose}
				onSuccess={(data) => {
					console.log("Contact information saved successfully:", data);
					if (onSuccess) {
						onSuccess(data as ContactInfoType);
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
