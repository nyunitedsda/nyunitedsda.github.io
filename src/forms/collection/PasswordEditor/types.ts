import type { UserDT } from "../../../api/request";

interface PasswordEditorProps {
	data: UserDT;
	onClose: () => void;
	onSuccess: (data?: UserDT) => void;
	open: boolean;
	type?: "admin" | "user";
	confirmOnSave?: boolean; // Optional prop to control confirmation dialog on save
}

export type { PasswordEditorProps };
