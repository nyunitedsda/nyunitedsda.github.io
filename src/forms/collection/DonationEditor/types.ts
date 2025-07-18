import type { DonationType } from "../../../api/request/types";

export interface DonationEditorProps {
	open: boolean;
	data?: Partial<DonationType>;
	onClose: () => void;
	onSuccess?: () => void;
}
