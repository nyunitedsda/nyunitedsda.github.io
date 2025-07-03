import "@testing-library/jest-dom";
import { describe, expect, it, screen } from "../../utils/index.ts";
import { render } from "../../utils/vitest-setup.tsx";
import Image from "./Image";
import type { ImageProps } from "./types";

describe("Image Component", () => {
	const defaultProps: ImageProps = {
		image: {
			src: "test-image.jpg",
			alt: "Test image",
		},
	};

	it("renders a basic image", () => {
		render(<Image {...defaultProps} />);
		
		const img = screen.getByRole("img", { name: "Test image" });
		expect(img).toBeInTheDocument();
		expect(img).toHaveAttribute("src", "test-image.jpg");
		expect(img).toHaveAttribute("alt", "Test image");
	});

	it("renders image with default alt text when alt is not provided", () => {
		const props: ImageProps = {
			image: {
				src: "test-image.jpg",
			},
		};
		
		render(<Image {...props} />);
		
    const img = screen.getByRole("presentation");
		expect(img).toHaveAttribute("alt", "");
	});

	it("applies lazy loading by default", () => {
		render(<Image {...defaultProps} />);
		
		const img = screen.getByRole("img");
		expect(img).toHaveAttribute("loading", "lazy");
	});

	it("applies default styles", () => {
		render(<Image {...defaultProps} />);
		
		const img = screen.getByRole("img");
		expect(img).toHaveStyle({
			objectFit: "scale-down",
			maxWidth: "100%",
			height: "auto",
			aspectRatio: "auto",
		});
	});

	it("renders width and height when provided", () => {
		const props: ImageProps = {
			image: {
				src: "test-image.jpg",
				alt: "Test image",
				width: 800,
				height: 600,
			},
		};
		
		render(<Image {...props} />);
		
		const img = screen.getByRole("img");
		expect(img).toHaveAttribute("width", "800");
		expect(img).toHaveAttribute("height", "600");
	});

	it("creates WebP picture element for supported formats", () => {
		const props: ImageProps = {
			image: {
				src: "test-image.jpg",
				alt: "Test image",
			},
		};
		
		render(<Image {...props} />);
		
		// Should render a picture element with WebP source
		const picture = screen.getByRole("img").closest("picture");
		expect(picture).toBeInTheDocument();
		
		// Check for WebP source
		const webpSource = picture?.querySelector('source[type="image/webp"]');
		expect(webpSource).toBeInTheDocument();
		expect(webpSource).toHaveAttribute("srcset", "test-image.webp");
		
		// Check for original format source
		const originalSource = picture?.querySelector('source[type="image/jpg"]');
		expect(originalSource).toBeInTheDocument();
		expect(originalSource).toHaveAttribute("srcset", "test-image.jpg");
	});

	it("handles PNG format for WebP conversion", () => {
		const props: ImageProps = {
			image: {
				src: "test-image.png",
				alt: "Test image",
			},
		};
		
		render(<Image {...props} />);
		
		const picture = screen.getByRole("img").closest("picture");
		const webpSource = picture?.querySelector('source[type="image/webp"]');
		const originalSource = picture?.querySelector('source[type="image/png"]');
		
		expect(webpSource).toHaveAttribute("srcset", "test-image.webp");
		expect(originalSource).toHaveAttribute("srcset", "test-image.png");
	});

	it("handles JPEG format for WebP conversion", () => {
		const props: ImageProps = {
			image: {
				src: "test-image.jpeg",
				alt: "Test image",
			},
		};
		
		render(<Image {...props} />);
		
		const picture = screen.getByRole("img").closest("picture");
		const webpSource = picture?.querySelector('source[type="image/webp"]');
		const originalSource = picture?.querySelector('source[type="image/jpeg"]');
		
		expect(webpSource).toHaveAttribute("srcset", "test-image.webp");
		expect(originalSource).toHaveAttribute("srcset", "test-image.jpeg");
	});

	it("renders simple img element for non-convertible formats", () => {
		const props: ImageProps = {
			image: {
				src: "test-image.svg",
				alt: "Test SVG",
			},
		};
		
		render(<Image {...props} />);
		
		const img = screen.getByRole("img");
		expect(img).toHaveAttribute("src", "test-image.svg");
		
		// Should not be wrapped in a picture element
		const picture = img.closest("picture");
		expect(picture).not.toBeInTheDocument();
	});

	it("renders simple img element when WebP version would be the same as original", () => {
		const props: ImageProps = {
			image: {
				src: "test-image.webp",
				alt: "Already WebP",
			},
		};
		
		render(<Image {...props} />);
		
		const img = screen.getByRole("img");
		expect(img).toHaveAttribute("src", "test-image.webp");
		
		// Should not be wrapped in a picture element
		const picture = img.closest("picture");
		expect(picture).not.toBeInTheDocument();
	});

	it("applies root Box properties", () => {
		const props: ImageProps = {
			root: {
				component: "div",
				sx: { padding: 2 },
			} as any, // Type assertion for test purposes
			image: {
				src: "test-image.jpg",
				alt: "Test image",
			},
		};
		
		render(<Image {...props} />);
		
		const img = screen.getByRole("img");
		expect(img.parentElement).toBeInTheDocument();
		expect(img.parentElement).toContainElement(img);
	});

	it("passes through additional image props", () => {
		const props: ImageProps = {
			image: {
				src: "test-image.jpg",
				alt: "Test image",
				"data-testid": "custom-img",
				title: "Custom title",
			} as any, // Type assertion to allow additional props
		};
		
		render(<Image {...props} />);
		
		const img = screen.getByTestId("custom-img");
		expect(img).toHaveAttribute("title", "Custom title");
	});

	it("handles empty src gracefully", () => {
		const props: ImageProps = {
			image: {
				src: "",
				alt: "Empty src",
			},
		};
		
		render(<Image {...props} />);
		
    screen.logTestingPlaygroundURL();
		const img = screen.getByRole('img', {
  name: /empty src/i
});
		expect(img.getAttribute("src")).toBeNull();
		expect(img).toHaveAttribute("alt", "Empty src");
	});

	it("handles case-insensitive file extensions", () => {
		const props: ImageProps = {
			image: {
				src: "test-image.JPG",
				alt: "Uppercase extension",
			},
		};
		
		render(<Image {...props} />);
		
		const picture = screen.getByRole("img").closest("picture");
		const webpSource = picture?.querySelector('source[type="image/webp"]');
		
		expect(webpSource).toHaveAttribute("srcset", "test-image.webp");
	});

	it("maintains aspect ratio when width and height are provided", () => {
		const props: ImageProps = {
			image: {
				src: "test-image.jpg",
				alt: "Test image",
				width: 1200,
				height: 800,
			},
		};
		
		render(<Image {...props} />);
		
		const img = screen.getByRole("img");
		expect(img).toHaveAttribute("width", "1200");
		expect(img).toHaveAttribute("height", "800");
		expect(img).toHaveStyle({ aspectRatio: "auto" });
	});
});
