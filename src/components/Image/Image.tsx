import { Box } from "@mui/material";
import type { FC } from "react";
import type { ImageProps } from "./types";

const Image: FC<ImageProps> = ({ root, image }) => {
	// Extract the src and optional webp source if available
	const { src, alt, ...restImageProps } = image;
	
	// Check if we have a webp version available by convention
	// This assumes you have webp versions in the webp-img folder with same filenames
	const webpSrc = src ? src.replace(/\.(jpg|jpeg|png)$/i, '.webp') : undefined;
	const hasWebp = webpSrc && webpSrc !== src;
	
	return (
		<Box {...root}>
			{hasWebp ? (
				<picture>
					<source srcSet={webpSrc} type="image/webp" />
					<source srcSet={src} type={`image/${src?.split('.').pop()}`} />
					<img
						{...restImageProps}
						src={src}
						alt={alt || ''}
						loading="lazy"
						style={{ 
							objectFit: "scale-down", 
							maxWidth: "100%", 
							height: "auto",
							// Improve CLS (Cumulative Layout Shift)
							aspectRatio: "auto" 
						}}
					/>
				</picture>
			) : (
				<img
					{...image}
					loading="lazy"
					style={{ 
						objectFit: "scale-down", 
						maxWidth: "100%", 
						height: "auto",
						// Improve CLS (Cumulative Layout Shift)
						aspectRatio: "auto" 
					}}
				/>
			)}
		</Box>
	);
};

export default Image;
