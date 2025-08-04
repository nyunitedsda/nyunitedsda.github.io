import { DeleteOutlined, VisibilityOutlined } from "@mui/icons-material";
import {
	type ButtonOwnProps,
	MenuItem,
	Stack,
	Typography,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import { type FC, lazy, Suspense, useMemo } from "react";
import { ConfirmationButton } from "../../../Buttons";
import type { ConfirmationButtonProps } from "../../../Buttons/types";
import { tableActions } from "./constants";
import type { LazyIconProps, TableActionProps } from "./types";

const EditOutlined = lazy(() => import("@mui/icons-material/EditOutlined"));

const LazyIcon: FC<LazyIconProps> = ({ children, fallback }) => (
	<Suspense fallback={fallback || <div>Loading...</div>}>{children}</Suspense>
);

const ICONS = {
	Delete: <DeleteOutlined />,
	Edit: <EditOutlined />,
	View: <VisibilityOutlined />,
};

const { deleteConfirm, editConfirm, viewConfirm } = tableActions;

const TableAction = <T extends {}>(props: TableActionProps<T>) => {
	const { data, onEdit, onDelete, onView, renderAction } = props;
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	if (renderAction) return renderAction(data);

	const elements = useMemo(() => {
		const actions = [];

		if (onEdit)
			actions.push({
				...editConfirm,
				onClick: () => onEdit(data),
			});

		if (onView)
			actions.push({
				...viewConfirm,
				onClick: () => onView(data),
			});

		if (onDelete)
			actions.push({
				...deleteConfirm,
				onClick: () => onDelete(data),
			});

		return actions.map(({ title, ...rest }) => {
			const buttonProps = isMobile
				? {
						...rest,
						variant: "text",
						title,
						sx: { width: "100%" },
						startIcon: (
							<LazyIcon>{ICONS[title as keyof typeof ICONS]}</LazyIcon>
						),
						children: (
							<Typography sx={{ color: "text.primary" }}>{title}</Typography>
						),
					}
				: {
						...rest,
						confirmVariant: "icon",
						children: <LazyIcon>{ICONS[title as keyof typeof ICONS]}</LazyIcon>,
					};

			return isMobile ? (
				<MenuItem
					key={title}
					onClick={buttonProps.onClick}
					aria-label={title}
					title={title}
				>
					<ConfirmationButton
						{...(buttonProps as ButtonOwnProps)}
						aria-label={`action-btn-${title}`}
					>
						{buttonProps?.children}
					</ConfirmationButton>
				</MenuItem>
			) : (
				<ConfirmationButton
					{...(buttonProps as unknown as ConfirmationButtonProps)}
					key={title}
					aria-label={title}
				>
					{buttonProps?.children}
				</ConfirmationButton>
			);
		});
	}, [data, onEdit, onDelete, onView, isMobile]);

	return (
		<>
			{isMobile ? (
				elements
			) : (
				<Stack direction="row" justifyContent="center">
					{elements}
				</Stack>
			)}
		</>
	);
};

export default TableAction;
