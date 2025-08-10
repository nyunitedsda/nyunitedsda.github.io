import type { DonationDT } from "@/api";

export interface DonationEditorProps {
	open: boolean;
	data?: Partial<DonationDT>;
	onClose: () => void;
	onSuccess?: (data: Partial<DonationDT>) => void;
}
