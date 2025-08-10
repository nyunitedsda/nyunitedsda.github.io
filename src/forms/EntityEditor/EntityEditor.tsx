import type { SxProps, Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useSnackbar } from "notistack";
import { useMemo } from "react";
import { createEntity, updateEntity } from "@/api";
import FormContainer from "../FormBuilder/FormContainer";
import type { EntityEditorProps } from "./types";

const titleSx: SxProps<Theme> = {
	position: "sticky",
	top: 0,
	backgroundColor: "inherit",
	zIndex: 1,
};

const EntityEditor = <T extends { id?: number }>({
	entity,
	id,
	validationSchema,
	defaultValues,
	children,
	cancelButtonText,
	submitButtonText,
	onSuccess,
	title,
	onCancel,
}: EntityEditorProps<T>) => {
	const { enqueueSnackbar } = useSnackbar();
	const isEditMode = useMemo(() => !!id, [id]);

	const handleSubmit = async (values: T) => {
		try {
			let result: T;

			if (isEditMode && id) {
				// Update existing data
				result = await updateEntity<T & { id: number }>(
					entity,
					id,
					values as T & { id: number },
				);

				enqueueSnackbar(`${entity} updated successfully`, {
					variant: "success",
				});
			} else {
				// Create new data
				result = await createEntity<T>(entity, values as Omit<T, "id">);
				enqueueSnackbar(`New ${entity} created successfully`, {
					variant: "success",
				});
			}

			if (onSuccess) {
				onSuccess(result);
			}
		} catch (err: any) {
			enqueueSnackbar(
				`Failed to ${isEditMode ? "update" : "create"} ${entity}: ${err.message || "Unknown error"}`,
				{ variant: "error" },
			);
		}
	};

	// Default submit button text based on mode if not provided
	const buttonText = useMemo(
		() =>
			submitButtonText ??
			(isEditMode ? `Update ${entity}` : `Create ${entity}`),
		[submitButtonText, isEditMode, entity],
	);

	return (
		<>
			{title && (
				<Typography variant="h6" gutterBottom sx={titleSx}>
					{title}
				</Typography>
			)}

			<FormContainer
				initialValues={defaultValues}
				validationSchema={validationSchema}
				onSubmit={handleSubmit}
				submitButtonText={buttonText}
				onCancel={onCancel}
				cancelButtonText={cancelButtonText}
			>
				{children}
			</FormContainer>
		</>
	);
};

export default EntityEditor;
