import { Box } from "@mui/material";
import type { CSSProperties, FC } from "react";
import type { ImageProps } from "./types";

const defaultImageStyles: CSSProperties = {
	objectFit: "scale-down",
	maxWidth: "100%",
	height: "auto",
	// Improve CLS (Cumulative Layout Shift)
	aspectRatio: "auto",
};

const Image: FC<ImageProps> = ({ root, image }) => {
	const { src, alt, width, height, ...restImageProps } = image;

	// Check if webp version available by convention
	// Expecting webp versions in the assets/img folder with webp ext filenames
	const webpSrc = src ? src.replace(/\.(jpg|jpeg|png)$/i, ".webp") : undefined;
	const hasWebp = webpSrc && webpSrc !== src;

	// Common img props to avoid duplication
	const commonImgProps = {
		...restImageProps,
		alt: alt || "",
		loading: "lazy" as const,
		style: defaultImageStyles,
		...(width && { width }),
		...(height && { height }),
	};

	return (
		<Box {...root}>
			{hasWebp ? (
				<picture>
					<source srcSet={webpSrc} type="image/webp" />
					<source srcSet={src} type={`image/${src?.split(".").pop()}`} />
					<img {...commonImgProps} src={src} />
				</picture>
			) : (
				<img {...commonImgProps} src={src} />
			)}
		</Box>
	);
};

export default Image;
