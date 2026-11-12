import { ConfirmationButton } from "@components/Buttons";
import type { FormContainerProps } from "@forms/FormBuilder";
import { Flex } from "antd";
import { Form, Formik, type FormikHelpers } from "formik";
import type { CSSProperties } from "react";

const childrenSx: CSSProperties = {
	width: "100%",
	maxWidth: 600,
	overflowY: "auto",
	paddingTop: 8,
	backgroundColor: "inherit",
	gap: 2,
};

const actionSx: CSSProperties = {
	marginTop: 24,
	position: "sticky",
	bottom: 0,
	backgroundColor: "inherit",
	flexGrow: 0,
	justifyContent: "flex-end",
	gap: 16,
};

const CANCEL_CONFIRMATION = {
	confirmationTitle: "Confirm Cancel",
	confirmationContent:
		"Are you sure you want to cancel? All changes will be lost.",
	confirmLabel: "Yes",
	cancelLabel: "No",
};

const SAVE_CONFIRMATION = {
	confirmationTitle: "Confirm Save",
	confirmationContent:
		"Record change will be permanent. Are you sure you want to save changes?",
	confirmLabel: "Yes",
	cancelLabel: "No",
};

const FormContainer = <T extends { [key: string]: unknown }>({
	initialValues,
	validationSchema,
	onSubmit,
	children,
	submitButtonText = "Submit",
	cancelButtonText = "Cancel",
	confirmOnSave = false,
	onCancel,
}: FormContainerProps<T>) => {
	return (
		<Formik
			enableReinitialize
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={async (values: T, formikHelpers: FormikHelpers<T>) => {
				await onSubmit(values, formikHelpers);
				formikHelpers.setSubmitting(false);
			}}
		>
			{({ isSubmitting, dirty }) => (
				<>
					<Form style={{ width: "100%" }}>
						<Flex vertical style={childrenSx}>
							{children}
						</Flex>

						<Flex style={actionSx}>
							{onCancel && (
								<ConfirmationButton
									shouldConfirm={dirty}
									variant="outlined"
									color="secondary"
									onClick={onCancel}
									{...CANCEL_CONFIRMATION}
								>
									{cancelButtonText}
								</ConfirmationButton>
							)}
							<ConfirmationButton
								type="submit"
								variant="contained"
								color="primary"
								disabled={isSubmitting}
								fullWidth={!onCancel}
								{...(confirmOnSave ? { shouldConfirm: dirty } : {})}
								{...SAVE_CONFIRMATION}
							>
								{isSubmitting ? "Submitting..." : submitButtonText}
							</ConfirmationButton>
						</Flex>
					</Form>
				</>
			)}
		</Formik>
	);
};

export default FormContainer;
