import type { ReactNode } from "react";

export interface FormContainerProps<T> {
	cancelButtonText?: string;
	children: ReactNode;
	initialValues: T;
	submitButtonText?: string;
	validationSchema: any;
	onSubmit: (values: T) => void | Promise<any>;
	onCancel?: () => void;
}
