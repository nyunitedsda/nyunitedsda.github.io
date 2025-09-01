import {
	TableAction,
	type ColumnDefinition,
	type TableActionProps,
} from "@components/DataTable";
import { createElement } from "react";

const generateActionColumn = <T extends { id?: number }>(
	props: Omit<TableActionProps<T>, "data">,
) =>
	({
		id: "actions",
		title: "Actions",
		field: "actions",
		align: "center",
		renderCell: (data: T) => {
			const { renderAction, ...rest } = props;

			return renderAction
				? renderAction(data)
				: createElement(TableAction, { ...({ data, ...rest } as any) });
		},
	}) as ColumnDefinition<T>;

export { generateActionColumn };
