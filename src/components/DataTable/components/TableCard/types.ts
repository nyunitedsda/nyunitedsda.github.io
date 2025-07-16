import type { ColumnDefinition } from "../../types";

interface TableCardProps<GenericType> {
	onDelete?: (data: GenericType) => void;
	onEdit?: (data: GenericType) => void;
	onView?: (data: GenericType) => void;
	renderAction?: (data: GenericType) => React.ReactNode;
	data: GenericType;
	columns: ColumnDefinition<GenericType>[];
}

export type { TableCardProps };
