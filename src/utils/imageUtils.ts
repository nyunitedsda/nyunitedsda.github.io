/**
 * Image optimization utility functions
 * These functions help with image loading, optimization, and responsive sizing
 */

/**
 * Checks if a webp version of an image exists based on a naming convention
 * @param imagePath The original image path
 * @returns The webp path if it follows the convention
 */
export const getWebpPath = (imagePath: string): string | undefined => {
	if (!imagePath) return undefined;

	// For images already in webp format
	if (imagePath.toLowerCase().endsWith(".webp")) return imagePath;

	// For images in our webp-img directory
	const webpPath = imagePath.replace(/\.(jpg|jpeg|png|gif)$/i, ".webp");
	if (webpPath !== imagePath) return webpPath;

	return undefined;
};

/**
 * Generates srcSet attribute for responsive images
 * @param basePath Base image path
 * @param sizes Array of width sizes for responsive images
 * @param extension Optional extension override
 * @returns srcSet string for use in img or source elements
 */
export const generateSrcSet = (
	basePath: string,
	sizes: number[] = [320, 640, 960, 1280],
	extension?: string,
): string => {
	if (!basePath || sizes.length === 0) return "";

	const basePathWithoutExt = basePath.replace(/\.\w+$/, "");
	let ext = extension;
  if (!ext) {
    const dotIndex = basePath.lastIndexOf('.');
    ext = (dotIndex !== -1 && dotIndex > basePath.lastIndexOf('/')) ? basePath.substring(dotIndex + 1) : "jpg";
  }

	return sizes
		.map((size) => `${basePathWithoutExt}-${size}.${ext} ${size}w`)
		.join(", ");
};

/**
 * Generates sizes attribute for responsive images
 * @returns Sizes string for use in img or source elements
 */
export const generateSizes = (): string => {
	return "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw";
};

/**
 * Calculate aspect ratio from dimensions to prevent layout shifts
 * @param width The width of the image
 * @param height The height of the image
 * @returns A string representing the aspect ratio for CSS
 */
export const calculateAspectRatio = (width: number, height: number): string => {
	if (!width || !height) return "auto";
	return `${width} / ${height}`;
};
