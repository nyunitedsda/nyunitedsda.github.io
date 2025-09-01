import type { PropsWithChildren, ReactNode } from "react";

type LazyIconProps = PropsWithChildren<{
	fallback?: ReactNode;
}>;

interface TableActionProps<T extends { id?: number }> {
	data: T;
	onEdit?: (data: T) => void;
	onDelete?: (data: T) => void;
	onView?: (data: T) => void;
	renderAction?: (data: T) => ReactNode;
}

export type { LazyIconProps, TableActionProps };
