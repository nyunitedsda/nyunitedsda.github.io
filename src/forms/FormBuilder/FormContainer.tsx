import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import type { SxProps, Theme } from "@mui/material/styles";
import { Form, Formik } from "formik";
import type { FormContainerProps } from "./types";

const childrenSx: SxProps<Theme> = {
	width: "100%",
	maxWidth: 600,
	overflowY: "auto",
	pt: 1,
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
			{({ isSubmitting }) => (
				<Form style={{ width: "100%" }}>
					<Stack spacing={2} sx={childrenSx}>
						{children}
					</Stack>

					{/* TODO: add a confirm cancel */}
					<Stack
						direction="row"
						spacing={2}
						justifyContent="flex-end"
						sx={{
							mt: 3,
							position: "sticky",
							bottom: 0,
							backgroundColor: "background.paper",
							flexGrow: 0,
						}}
					>
						{onCancel && (
							<Button variant="outlined" color="secondary" onClick={onCancel}>
								{cancelButtonText}
							</Button>
						)}
						<Button
							type="submit"
							variant="contained"
							color="primary"
							disabled={isSubmitting}
							fullWidth={!onCancel}
							sx={{
								color: (theme) =>
									`${theme.palette.primary.contrastText} !important`,
							}}
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
