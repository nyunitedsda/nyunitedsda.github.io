import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import type { SxProps, Theme } from "@mui/material/styles";
import { Form, Formik } from "formik";
import ConfirmationButton from "../../components/Buttons/ConfirmationButton";
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

const FormContainer = <T extends { id?: number }>({
	initialValues,
	validationSchema,
	onSubmit,
	children,
	submitButtonText = "Submit",
	cancelButtonText = "Cancel",
	onCancel,
}: FormContainerProps<T>) => {
	return (
		<Formik
			enableReinitialize
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={onSubmit}
		>
			{({ isSubmitting, dirty }) => (
				<Form style={{ width: "100%" }}>
					<Stack spacing={2} sx={childrenSx}>
						{children}
					</Stack>

					{/* TODO: add a confirm cancel */}
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
						<Button
							type="submit"
							variant="contained"
							color="primary"
							disabled={isSubmitting}
							fullWidth={!onCancel}
						>
							{isSubmitting ? "Submitting..." : submitButtonText}
						</Button>
					</Stack>
				</Form>
			)}
		</Formik>
	);
};

export default FormContainer;
