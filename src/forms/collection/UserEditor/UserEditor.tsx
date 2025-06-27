import { type FC, useMemo } from "react";
import type { UserRole, UserType } from "../../../api/request/types";
import ProjectModal from "../../../components/ProjectModal/ProjectModal";
import EntityEditor from "../../EntityEditor/EntityEditor";
import { default as InputField } from "../../Input/FormField";
import type { EditorProps } from "../types";
import userSchema from "./schema";

const defaultValues: Partial<UserType> = {
	email: "",
	firstName: "",
	lastName: "",
	role: "guest",
	emailVerified: false,
};

const EDIT_TITLE = "Edit User";
const ADD_TITLE = "Add User";
const ENTITY_NAME = "users";
const BUTTON_TEXT = "Save";
const EMAIL_FIELD_LABEL = "Email Address";
const FIRST_NAME_FIELD_LABEL = "First Name";
const LAST_NAME_FIELD_LABEL = "Last Name";
const ROLE_FIELD_LABEL = "User Role";
const EMAIL_VERIFIED_FIELD_LABEL = "Email Verified";

interface RoleOption {
	id: number;
	value: UserRole;
	label: string;
}

const roleOptions: RoleOption[] = [
	{ id: 1, value: "guest", label: "Guest" },
	{ id: 2, value: "moderator", label: "Moderator" },
	{ id: 3, value: "admin", label: "Administrator" },
];

const UserEditor: FC<EditorProps<Partial<UserType>>> = ({
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
				validationSchema={userSchema}
				onCancel={onClose}
				onSuccess={(data) => {
					console.log("User saved successfully:", data);
					if (onSuccess) {
						onSuccess(data as UserType);
					}
				}}
			>
				<InputField
					name="email"
					label={EMAIL_FIELD_LABEL}
					fieldType="text"
					type="email"
					placeholder="Enter email address"
				/>

				<InputField
					name="firstName"
					label={FIRST_NAME_FIELD_LABEL}
					fieldType="text"
					placeholder="Enter first name (optional)"
				/>

				<InputField
					name="lastName"
					label={LAST_NAME_FIELD_LABEL}
					fieldType="text"
					placeholder="Enter last name (optional)"
				/>

				<InputField
					name="role"
					label={ROLE_FIELD_LABEL}
					fieldType="select"
					items={roleOptions}
					renderItemLabel={(item) => item.label}
					valueResolver={(item) => item.value}
				/>

				<InputField
					name="emailVerified"
					label={EMAIL_VERIFIED_FIELD_LABEL}
					fieldType="checkbox"
				/>
			</EntityEditor>
		</ProjectModal>
	);
};

export default UserEditor;
