import type { FormikHelpers } from "formik";
import type { ReactNode } from "react";

export interface FormContainerProps<T> {
	cancelButtonText?: string;
	children: ReactNode;
	initialValues: T;
	submitButtonText?: string;
	validationSchema: any;
	confirmOnSave?: boolean;
	onSubmit: (
		values: T,
		formikHelpers: FormikHelpers<T>,
	) => Promise<any> | undefined;
	onCancel?: () => void;
}
