import Typography from "@mui/material/Typography";
import { useEffect, useMemo, useState } from "react";
import { createEntity, updateEntity } from "../../api/request/commonMutations";
import { getDatabaseItem } from "../../api/request/commonQueries";
import RingLoader from "../../components/Loaders/RingLoader";
import FormContainer from "../FormBuilder/FormContainer";
import type { EntityEditorProps } from "./types";
import { useSnackbar } from "notistack";

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

	const [initialValues, setInitialValues] = useState<T>(defaultValues);
	const [isLoading, setIsLoading] = useState<boolean>(!!id);

	const isEditMode = !!id;

	// Fetch data if in edit mode
	useEffect(() => {
		if (id) {
			setIsLoading(true);

			getDatabaseItem<T & { id: number }>(entity, id)
				.then((data) => {
					if (data) {
						setInitialValues((data?.data ?? data) as unknown as T);
					}
				})
				.catch((err) => {
					enqueueSnackbar(
						`Failed to load ${entity}: ${err.message || "Unknown error"}`,
						{ variant: "error" },
					);
				})
				.finally(() => {
					setIsLoading(false);
				});
		}
	}, [entity, id]);

	const handleSubmit = async (values: T) => {
		try {
			let result: T;

			if (isEditMode && id) {
				// Update existing entity
				result = await updateEntity<T & { id: number }>(
					entity,
					id,
					values as T & { id: number },
				);

				enqueueSnackbar(`${entity} updated successfully`, {
					variant: "success",
				});
			} else {
				// Create new entity
				result = await createEntity<T>(entity, values as Omit<T, "id">);
				enqueueSnackbar(`New ${entity} created successfully`, {
					variant: "success",
				});
			}

			// Call success callback if provided
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
				<Typography variant="h6" gutterBottom>
					{title}
				</Typography>
			)}

			{isLoading ? (
				<>
					<RingLoader />
					<Typography variant="body1">{`Loading ${entity} data...`}</Typography>
				</>
			) : (
				<FormContainer
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={handleSubmit}
					submitButtonText={buttonText}
					onCancel={onCancel}
					cancelButtonText={cancelButtonText}
				>
					{children}
				</FormContainer>
			)}
		</>
	);
};

export default EntityEditor;
