import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import { type FC, memo } from "react";
import ProjectModal from "../ProjectModal/ProjectModal";
import type { ConfirmationDialogProps } from "./types";

const ConfirmationDialog: FC<ConfirmationDialogProps> = ({
	title,
	content,
	open,
	cancelLabel = "Cancel",
	confirmLabel = "Confirm",
	onConfirm,
	onClose,
}) => (
	<ProjectModal ariaText={title} onClose={onClose} open={open}>
		<CardHeader title={title} />
		<CardContent>{content}</CardContent>
		<CardActions sx={{ justifyContent: "flex-end" }}>
			<Button color="secondary" onClick={onClose} variant="outlined">
				{cancelLabel}
			</Button>
			<Button color="primary" variant="contained" onClick={onConfirm}>
				{confirmLabel}
			</Button>
		</CardActions>
	</ProjectModal>
);

export default memo(ConfirmationDialog);
