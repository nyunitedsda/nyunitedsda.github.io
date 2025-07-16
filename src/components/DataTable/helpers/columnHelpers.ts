import { createElement } from "react";
import TableAction from "../components/TableAction/TableAction";
import type { TableActionProps } from "../components/TableAction/types";
import type { ColumnDefinition, GenericType } from "../types";

const generateActionColumn = ({
  onEdit, onDelete, onView, renderAction 
  }: Omit<TableActionProps<GenericType>, "data">
): ColumnDefinition<GenericType> => ({
	id: "actions",
	title: "Actions",
  field: "actions",
	align: "center",
	renderCell: (data: GenericType) => renderAction ? renderAction(data) : (
    createElement(
      TableAction, 
      { data, onEdit, onDelete, onView } 
    )
  ),
});

export { generateActionColumn };
