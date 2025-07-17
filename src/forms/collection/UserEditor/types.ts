import type { UserType } from "../../../api/request/types";

export interface UserEditorProps {
	data: UserType;
	open: boolean;
	onClose: () => void;
	onSuccess?: (data?: UserType) => void;
}
