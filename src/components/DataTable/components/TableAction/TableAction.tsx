import { DeleteOutlined, VisibilityOutlined } from "@mui/icons-material";
import { Stack } from "@mui/material";
import { type FC, lazy, Suspense, useMemo } from "react";
import ConfirmationButton from "../../../Buttons/ConfirmationButton";
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
		

		return actions.map(({ title, children, confirmVariant, ...rest }) => (
			<ConfirmationButton
				key={title}
				title={title}
				confirmVariant="icon"
				{...rest}
			>
        <LazyIcon>
				{ICONS[title as keyof typeof ICONS] || children}
        </LazyIcon>
			</ConfirmationButton>
		));
	}, [data, onEdit, onDelete, onView]);

	return (
		<Stack direction="row" justifyContent="center" >
			{elements}
		</Stack>
	);
};

export default TableAction;
