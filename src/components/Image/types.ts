import type { BoxProps } from "@mui/material/Box";

export interface ImageProps {
	root?: BoxProps;
	image: {
		src: string;
		alt?: string;
		width?: number;
		height?: number;
	};
}
