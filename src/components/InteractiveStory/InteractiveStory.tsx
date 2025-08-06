import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import {
	cloneElement,
	type FC,
	isValidElement,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from "react";
import type { GenericType } from "../DataTable/types";
import type { InteractiveStoryProps } from "./types";

const InteractiveStoryWrapper: FC<InteractiveStoryProps<GenericType>> = ({
	buttonText = "Display Component",
	children,
	extraProps = {},
	open: initialOpen = false,
}) => {
	const [open, setOpen] = useState<boolean>(initialOpen);

	// useEffect(() => {
	// 	if (extraProps && Object.hasOwn(extraProps, "open")) {
	// 		setOpen(extraProps.open as boolean);
	// 	}
	// }, [extraProps]);


	useEffect(() => {
		// if (initialOpen ) {
			setOpen(initialOpen as boolean);
		// }
	}, [initialOpen]);
	const handleOpen = () => {

		setOpen(true);
	};
	const handleClose = useCallback(() => {
		setOpen(false);
		if (
			extraProps &&
			Object.hasOwn(extraProps, "onClose") &&
			typeof extraProps.onClose === "function"
		) {
			console.log("Calling onClose from extraProps");
			(extraProps as unknown as { onClose: () => void })?.onClose?.();
		}
	}, [extraProps]);
	console.log("open: ", open);

	const childrenProps = useMemo(
		() => ({
			...extraProps,
			...(Object.hasOwn(extraProps, "onClose")
				? { onClose: handleClose }
				: { onClose: () => setOpen(false) }),
			open,

		}),
		[open, extraProps],
	);

	return (
		<Stack
			direction="column"
			spacing={2}
			sx={{ p: 2, width: "100%", height: "100%" }}
		>
			<Button
				onClick={handleOpen}
				variant="contained"
				color="primary"
				size="large"
				sx={{
					maxWidth: "350px",
					overflow: "hidden",
					textOverflow: "ellipsis",
					whiteSpace: "nowrap !important",
					flexGrow: 1,
				}}
			>
				{buttonText}
			</Button>
			{isValidElement(children) ? cloneElement(children, childrenProps) : null}
		</Stack>
	);
};

export default InteractiveStoryWrapper;
