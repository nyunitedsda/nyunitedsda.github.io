import type { TableCellProps } from "@mui/material/TableCell";
import type { ReactNode } from "react";

type GenericType = { [key: string]: ReactNode };

interface ColumnDefinition<GenericType> {
	id: string;
	title: string;
	field: keyof GenericType;
	header?: string;
	align?: TableCellProps["align"];
	renderCell?: (data: GenericType) => ReactNode;
	renderHeader?: ReactNode;
}

interface DataTableProps<GenericType> {
	columns: ColumnDefinition<GenericType>[];
	data: GenericType[];
	onEdit?: (data: GenericType) => void;
	onDelete?: (data: GenericType) => void;
	onView?: (data: GenericType) => void;
	renderAction?: (data: GenericType) => ReactNode;
}

export type { ColumnDefinition, DataTableProps, GenericType };
