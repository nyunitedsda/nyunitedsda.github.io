import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { type FC, useCallback, useState } from "react";
import ConfirmationDialog from "../../ConfirmationDialog/ConfirmationDialog";
import type { ConfirmationButtonProps } from "../types";

const ConfirmationButton: FC<ConfirmationButtonProps> = ({
	shouldConfirm = false,
	confirmationTitle = "Confirm Action",
	confirmationContent = "Are you sure you want to proceed?",
	cancelLabel = "Cancel",
	confirmLabel = "Confirm",
	onClick,
	children,
	confirmVariant = "button",
	...buttonProps
}) => {
	const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

	const VITE_API_URL =
	(import.meta as unknown as ImportMeta).env.VITE_API_URL ||
	"http://localhost:3000";

	console.log("VITE_API_URL:", VITE_API_URL);

	const handleButtonClick = useCallback(() => {
		if (shouldConfirm) {
			setIsDialogOpen(true);
		} else {
			onClick?.();
		}
	}, [shouldConfirm, onClick]);

	const handleDialogClose = useCallback(() => {
		setIsDialogOpen(false);
	}, []);

	const handleConfirm = useCallback(() => {
		setIsDialogOpen(false);
		onClick?.();
	}, [onClick]);

	return (
		<>
			{confirmVariant === "icon" ? (
				<IconButton {...(buttonProps as any)} onClick={handleButtonClick}>
					{children}
				</IconButton>
			) : (
				<Button {...(buttonProps as any)} onClick={handleButtonClick}>
					{children}
				</Button>
			)}

			{shouldConfirm && (
				<ConfirmationDialog
					title={confirmationTitle}
					content={confirmationContent}
					open={isDialogOpen}
					cancelLabel={cancelLabel}
					confirmLabel={confirmLabel}
					onClose={handleDialogClose}
					onConfirm={handleConfirm}
				/>
			)}
		</>
	);
};

export default ConfirmationButton;
