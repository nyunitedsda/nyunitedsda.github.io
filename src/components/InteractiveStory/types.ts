import type { PropsWithChildren } from "react";

export type InteractiveStoryProps<GenericType> = PropsWithChildren<{
	buttonText?: string;
	extraProps?: GenericType;
	open?: boolean;
}>;
