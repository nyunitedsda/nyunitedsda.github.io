export interface EditorProps<T> {
  open: boolean;
  entity?: T;
  onClose: () => void;
  onSuccess?: (data: T) => void;
}