import type { UserDT } from "../../../api/request/databaseTypes";

export interface UserEditorProps {
	data: UserDT;
	open: boolean;
	onClose: () => void;
	onSuccess?: (data?: UserDT) => void;
}
