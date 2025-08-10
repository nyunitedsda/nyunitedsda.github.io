import type { PropsWithChildren } from "react";

export type InteractiveStoryProps<T> = PropsWithChildren<{
	buttonText?: string;
	extraProps?: T;
	open?: boolean;
}>;
