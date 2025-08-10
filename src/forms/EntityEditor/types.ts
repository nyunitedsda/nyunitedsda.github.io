import type { ReactNode } from "react";
import type { DatabaseEntity } from "../../api/request";

interface EntityEditorProps<T extends { id?: number }> {
	/**
	 * The database data type
	 */
	entity: DatabaseEntity;

	/**
	 * ID of data to update (if updating existing data)
	 */
	id?: number;

	/**
	 * Validation schema for form (Yup schema)
	 */
	validationSchema: any;

	/**
	 * Default/initial values for data
	 */
	defaultValues: T;

	/**
	 * Form fields to render
	 */
	children: ReactNode;

	/**
	 * Text for the cancel button
	 * Defaults to "Cancel"
	 */

	cancelButtonText?: string;

	/**
	 *
	 * @returns void
	 * Optional callback when the form is closed without submission
	 */
	onCancel?: () => void;

	/**
	 * Text for the submit button
	 * Defaults to "Submit"
	 */
	submitButtonText?: string;

	/**
	 * Optional callback after successful submission
	 */
	onSuccess?: (data: T) => void;

	/**
	 * Optional title for the form
	 */
	title?: string;
}

export type { EntityEditorProps };

