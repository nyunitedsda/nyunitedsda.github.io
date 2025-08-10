import Stack from "@mui/material/Stack";
import type { SxProps, Theme } from "@mui/material/styles";
import { Form, Formik, type FormikHelpers } from "formik";
import { ConfirmationButton } from "../../components/Buttons";
import type { FormContainerProps } from "./types";

const childrenSx: SxProps<Theme> = {
	width: "100%",
	maxWidth: 600,
	overflowY: "auto",
	pt: 1,
	backgroundColor: "inherit",
};

const actionSx: SxProps<Theme> = {
	mt: 3,
	position: "sticky",
	bottom: 0,
	backgroundColor: "inherit",
	flexGrow: 0,
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

const FormContainer = <T extends Object>({
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
				<Form style={{ width: "100%" }}>
					<Stack spacing={2} sx={childrenSx}>
						{children}
					</Stack>

					<Stack
						direction="row"
						spacing={2}
						justifyContent="flex-end"
						sx={actionSx}
					>
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
					</Stack>
				</Form>
			)}
		</Formik>
	);
};

export default FormContainer;
