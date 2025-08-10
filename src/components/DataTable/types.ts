import type { TableCellProps } from "@mui/material/TableCell";
import type { ReactNode } from "react";

interface ColumnDefinition<T extends { id?: number }> {
	id: string;
	title: string;
	field: keyof T;
	header?: string;
	align?: TableCellProps["align"];
	renderCell?: (data: T) => ReactNode;
	renderHeader?: ReactNode;
}

interface DataTableProps<T extends { id?: number; [key: string]: unknown }> {
	isLoading: boolean;
	columns: ColumnDefinition<T>[];
	data: T[];
	onEdit?: (data: T) => void;
	onDelete?: (data: T) => void;
	onView?: (data: T) => void;
	renderAction?: (data: T) => ReactNode;
}

export type { ColumnDefinition, DataTableProps };
