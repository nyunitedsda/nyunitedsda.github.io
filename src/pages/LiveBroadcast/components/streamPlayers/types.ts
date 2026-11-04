import type { IframeHTMLAttributes } from "react";

export interface StreamDisplayProps
	extends IframeHTMLAttributes<{ [key: string]: unknown }> {
	id: string;
}
