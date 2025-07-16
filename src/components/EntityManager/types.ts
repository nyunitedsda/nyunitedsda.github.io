import type { SxProps, Theme } from "@mui/material/styles";
import type { ComponentType } from "react";
import type { DatabaseEntity } from "../../api/request/types";

export interface ItemComponentProps {
	title: string;
	subtitle: string;
	onEdit?: () => void;
	onDelete?: () => void;
	sx?: SxProps<Theme>;
}

export interface EditorComponentProps<T> {
	open: boolean;
	data?: Partial<T>;
	onClose: () => void;
	onSuccess?: (data?: T) => void;
}

export interface EntityManagerProps<T extends { id: number }> {
	entityName: DatabaseEntity;
	queryKey: string;
	title: string;
	subtitle: string;
	emptyText?: string;
	deleteConfirmation: {
		title: string;
		message: string;
	};
	ItemComponent: ComponentType<ItemComponentProps>;
	EditorComponent: ComponentType<EditorComponentProps<T>>;
	getItemTitle: (item: T) => string;
	getItemSubtitle: (item: T) => string;
	createNewEntity: () => Partial<T>;
	successMessages?: {
		save?: string;
		delete?: string;
	};
}
