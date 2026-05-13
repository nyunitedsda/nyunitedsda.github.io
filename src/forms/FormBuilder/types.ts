import type { FormikConfig, FormikHelpers } from "formik";
import type { ReactNode } from "react";

export interface FormContainerProps<T> {
	cancelButtonText?: string;
	children: ReactNode;
	initialValues: T;
	submitButtonText?: string;
	validationSchema: FormikConfig<T>["validationSchema"];
	confirmOnSave?: boolean;
	onSubmit: (
		values: T,
		formikHelpers: FormikHelpers<T>,
	) => Promise<unknown> | undefined;
	onCancel?: () => void;
}
