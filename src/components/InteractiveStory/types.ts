import type { ReactNode } from "react";

export interface InteractiveStoryProps<GenericType> {
	buttonText?: string;
	children: ReactNode;
	extraProps?: GenericType;
}
