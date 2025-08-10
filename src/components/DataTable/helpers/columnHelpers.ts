import { createElement } from "react";
import TableAction from "../components/TableAction/TableAction";
import type { TableActionProps } from "../components/TableAction/types";
import type { ColumnDefinition } from "../types";

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
