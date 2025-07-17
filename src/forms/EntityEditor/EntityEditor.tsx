import type { SxProps, Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useSnackbar } from "notistack";
import { useEffect, useMemo, useState } from "react";
import { createEntity, updateEntity } from "../../api/request/commonMutations";
import { getDatabaseItem } from "../../api/request/commonQueries";
import RingLoader from "../../components/Loaders/RingLoader";
import FormContainer from "../FormBuilder/FormContainer";
import type { EntityEditorProps } from "./types";

const titleSx: SxProps<Theme> = {
	position: "sticky",
	top: 0,
	backgroundColor: "inherit",
	zIndex: 1,
};
const EntityEditor = <T extends { id?: number }>({
	data,
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

			getDatabaseItem<T & { id: number }>(data, id)
				.then((data) => {
					if (data) {
						setInitialValues((data?.data ?? data) as unknown as T);
					}
				})
				.catch((err) => {
					enqueueSnackbar(
						`Failed to load ${data}: ${err.message || "Unknown error"}`,
						{ variant: "error" },
					);
				})
				.finally(() => {
					setIsLoading(false);
				});
		}
	}, [data, id]);

	const handleSubmit = async (values: T) => {
		try {
			let result: T;

			if (isEditMode && id) {
				// Update existing data
				result = await updateEntity<T & { id: number }>(
					data,
					id,
					values as T & { id: number },
				);

				enqueueSnackbar(`${data} updated successfully`, {
					variant: "success",
				});
			} else {
				// Create new data
				result = await createEntity<T>(data, values as Omit<T, "id">);
				enqueueSnackbar(`New ${data} created successfully`, {
					variant: "success",
				});
			}

			// Call success callback if provided
			if (onSuccess) {
				onSuccess(result);
			}
		} catch (err: any) {
			enqueueSnackbar(
				`Failed to ${isEditMode ? "update" : "create"} ${data}: ${err.message || "Unknown error"}`,
				{ variant: "error" },
			);
		}
	};

	// Default submit button text based on mode if not provided
	const buttonText = useMemo(
		() =>
			submitButtonText ?? (isEditMode ? `Update ${data}` : `Create ${data}`),
		[submitButtonText, isEditMode, data],
	);

	return (
		<>
			{title && (
				<Typography variant="h6" gutterBottom sx={titleSx}>
					{title}
				</Typography>
			)}

			{isLoading ? (
				<>
					<RingLoader />
					<Typography variant="body1">{`Loading ${data} data...`}</Typography>
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
