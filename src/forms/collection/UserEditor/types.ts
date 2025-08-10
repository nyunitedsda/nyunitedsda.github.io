import type { UserDT } from "@/api";

export interface UserEditorProps {
	data: UserDT;
	open: boolean;
	onClose: () => void;
	onSuccess?: (data?: UserDT) => void;
}
