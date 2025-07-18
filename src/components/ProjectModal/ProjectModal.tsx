import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import type { FC } from "react";
import type { ProjectModalProps } from "./types";

const modalStyle = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: "100%",
	maxWidth: "600px",
	maxHeight: "90vh",
	overflow: "auto",
	bgcolor: "background.paper",
	borderRadius: 1,
	boxShadow: 24,
};

const ProjectModal: FC<ProjectModalProps> = ({
	ariaText,
	children,
	onClose,
	open,
	zeroPadding = false,
}) => {
	if (!open) return null;
	return (
		<Modal
			aria-labelledby={`${ariaText}-modal-title`}
			aria-describedby={`${ariaText}-modal-description`}
			open={open}
			onClose={onClose}
			closeAfterTransition
			slots={{ backdrop: Backdrop }}
			onKeyDown={(event) => {
				if (event.key === "Escape") {
					onClose();
				}
			}}
			slotProps={{
				backdrop: {
					timeout: 500,
				},
			}}
		>
			<Fade in={open}>
				<Stack sx={{ ...modalStyle, p: zeroPadding ? 0 : 2 }}>{children}</Stack>
			</Fade>
		</Modal>
	);
};

export default ProjectModal;
