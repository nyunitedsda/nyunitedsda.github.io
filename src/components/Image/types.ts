import type { BoxProps } from "@mui/material/Box";

/**
 * Defines the type of image source for the Image component.
 ** @remarks
 * - "local": Images stored in the public folder (e.g., "assets/images/my-image.jpg")
 * - "remote": Images hosted on external servers (e.g., "https://example.com/image.jpg")
 *
 * @example
 * ```typescript
 * // For local images in the public folder
 * const localImage: ImageSourceType = "local";
 *
 * // For remote images from CDN or external servers
 * const remoteImage: ImageSourceType = "remote";
 * ```
 */
export type ImageSourceType = "local" | "remote";

/**
 * Properties for the Image component.
 *
 * This component provides an optimized image rendering solution with automatic
 * WebP format detection and responsive image loading capabilities.
 *
 * @example
 * ```typescript
 * // Basic usage with local image
 * const basicProps: ImageProps = {
 *   image: {
 *     src: "assets/images/hero-image.jpg",
 *     alt: "Hero image for homepage"
 *   }
 * };
 *
 * // Advanced usage with remote image and custom styling
 * const advancedProps: ImageProps = {
 *   root: {
 *     sx: { borderRadius: 2, overflow: 'hidden' }
 *   },
 *   source: "remote",
 *   image: {
 *     src: "https://cdn.example.com/images/product.jpg",
 *     alt: "Product showcase image",
 *     width: 800,
 *     height: 600
 *   }
 * };
 * ```
 */
export interface ImageProps {
	/**
	 * Properties for the Box component that wraps the image.
	 *
	 * @remarks
	 * This allows you to apply Material-UI Box styling to the image container,
	 * including padding, margin, border, and other layout properties.
	 */
	root?: BoxProps;

	/**
	 * Indicates the source type of the image.
	 *
	 * @defaultValue "local"
	 *
	 * @remarks
	 * - "local": Images stored in the public folder (e.g., "assets/images/my-image.jpg")
	 * - "remote": Images hosted on external servers (e.g., "https://example.com/image.jpg")
	 */
	source?: ImageSourceType;

	/**
	 * Image configuration object containing source URL and metadata.
	 */
	image: {
		/**
		 * The source URL or path of the image.
		 *
		 * @example
		 * ```typescript
		 * // Local image path
		 * src: "assets/images/logo.png"
		 *
		 * // Remote image URL
		 * src: "https://cdn.example.com/images/hero.jpg"
		 * ```
		 */
		src: string;

		/**
		 * Alternative text for the image.
		 *
		 * @remarks
		 * This is crucial for accessibility and SEO. Provide descriptive text
		 * that explains what the image shows or its purpose in the context.
		 *
		 * @example
		 * ```typescript
		 * alt: "Company logo with blue background"
		 * alt: "Product image showing red sneakers from side view"
		 * ```
		 */
		alt?: string;

		/**
		 * The intrinsic width of the image in pixels.
		 *
		 * @remarks
		 * Used for aspect ratio calculation and preventing layout shift.
		 * Should match the actual image dimensions when possible.
		 */
		width?: number;

		/**
		 * The intrinsic height of the image in pixels.
		 *
		 * @remarks
		 * Used for aspect ratio calculation and preventing layout shift.
		 * Should match the actual image dimensions when possible.
		 */
		height?: number;
	};
}
