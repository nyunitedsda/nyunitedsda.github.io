export interface EditorProps<T> {
	open: boolean;
	data?: T;
	onClose: () => void;
	onSuccess?: (data: T) => void;
}
