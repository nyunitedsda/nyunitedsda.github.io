import type { ConfirmationButtonProps } from "@components/Buttons";
import ConfirmationDialog from "@components/ConfirmationDialog";
import Button, { type ButtonProps } from "@mui/material/Button";
import IconButton, { type IconButtonProps } from "@mui/material/IconButton";
import { type FC, useCallback, useState } from "react";

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
				<IconButton
					{...(buttonProps as IconButtonProps)}
					onClick={handleButtonClick}
				>
					{children}
				</IconButton>
			) : (
				<Button {...(buttonProps as ButtonProps)} onClick={handleButtonClick}>
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
