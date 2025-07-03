import { Box } from "@mui/material";
import type { Meta, StoryObj } from "@storybook/react";
import Image from "./Image";

const meta: Meta<typeof Image> = {
	title: "Components/Image",
	component: Image,
	tags: ["autodocs"],
	decorators: [
		(Story) => (
			<Box sx={{ padding: 3, maxWidth: "800px", margin: "0 auto" }}>
				<Story />
			</Box>
		),
	],
	argTypes: {
		root: {
			control: "object",
			description: "Box props for the container element",
		},
		image: {
			control: "object",
			description: "Image configuration object",
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		image: {
			src: "src/assets/img/family.webp",
			alt: "Family gathering at church",
		},
	},
	parameters: {
		docs: {
			description: {
				story:
					"A basic image component with lazy loading and WebP support. The component automatically detects if a WebP version is available.",
			},
		},
	},
};

export const WithDimensions: Story = {
	args: {
		image: {
			src: "src/assets/img/members.webp",
			alt: "Church members gathering",
			width: 600,
			height: 400,
		},
	},
	parameters: {
		docs: {
			description: {
				story:
					"Image with explicit width and height dimensions to prevent layout shift.",
			},
		},
	},
};

export const WithContainer: Story = {
	args: {
		root: {
			sx: {
				border: "2px solid #e0e0e0",
				borderRadius: 2,
				padding: 2,
				backgroundColor: "#f5f5f5",
			},
		},
		image: {
			src: "src/assets/img/youths.webp",
			alt: "Youth group activities",
		},
	},
	parameters: {
		docs: {
			description: {
				story: "Image with custom container styling using the root Box props.",
			},
		},
	},
};

export const ResponsiveCard: Story = {
	args: {
		root: {
			sx: {
				maxWidth: 400,
				border: "1px solid #ddd",
				borderRadius: 3,
				overflow: "hidden",
				boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
			},
		},
		image: {
			src: "src/assets/img/group-pray.webp",
			alt: "Group prayer session",
		},
	},
	parameters: {
		docs: {
			description: {
				story:
					"Image used in a card-like layout with responsive design and shadow effects.",
			},
		},
	},
};

export const SmallThumbnail: Story = {
	args: {
		root: {
			sx: {
				width: 120,
				height: 120,
				border: "1px solid #ccc",
				borderRadius: "50%",
				overflow: "hidden",
			},
		},
		image: {
			src: "src/assets/img/elder.webp",
			alt: "Church elder portrait",
			width: 120,
			height: 120,
		},
	},
	parameters: {
		docs: {
			description: {
				story:
					"Small circular thumbnail image, useful for profile pictures or avatars.",
			},
		},
	},
};

export const Gallery: Story = {
	render: () => (
		<Box
			sx={{
				display: "grid",
				gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
				gap: 2,
			}}
		>
			{[
				{ src: "src/assets/img/family2.webp", alt: "Family moment 1" },
				{ src: "src/assets/img/family3.webp", alt: "Family moment 2" },
				{ src: "src/assets/img/family4.webp", alt: "Family moment 3" },
				{ src: "src/assets/img/family5.webp", alt: "Family moment 4" },
			].map((img, index) => (
				<Image
					key={index}
					root={{
						sx: {
							border: "1px solid #e0e0e0",
							borderRadius: 2,
							overflow: "hidden",
							aspectRatio: "4/3",
						},
					}}
					image={img}
				/>
			))}
		</Box>
	),
	parameters: {
		docs: {
			description: {
				story:
					"Multiple images arranged in a responsive grid layout, demonstrating how the Image component works in gallery scenarios.",
			},
		},
	},
};

export const HeroImage: Story = {
	args: {
		root: {
			sx: {
				width: "100%",
				height: 300,
				overflow: "hidden",
				borderRadius: 2,
				position: "relative",
			},
		},
		image: {
			src: "src/assets/img/singing-sister.webp",
			alt: "Sister singing during worship",
			width: 800,
			height: 300,
		},
	},
	parameters: {
		docs: {
			description: {
				story:
					"Large hero-style image with fixed height and full width, perfect for banner sections.",
			},
		},
	},
};

export const WithLogo: Story = {
	args: {
		root: {
			sx: {
				width: 200,
				height: 80,
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				backgroundColor: "#fff",
				border: "1px solid #e0e0e0",
				borderRadius: 1,
			},
		},
		image: {
			src: "src/assets/NY United Logo small.png",
			alt: "NY United SDA Church Logo",
			width: 180,
			height: 60,
		},
	},
	parameters: {
		docs: {
			description: {
				story:
					"Logo image with PNG format (non-WebP convertible) in a styled container.",
			},
		},
	},
};

export const WithoutAlt: Story = {
	args: {
		image: {
			src: "src/assets/img/members3.webp",
		},
	},
	parameters: {
		docs: {
			description: {
				story:
					"Image without alt text (defaults to empty string for accessibility compliance).",
			},
		},
	},
};

export const LoadingStates: Story = {
	render: () => (
		<Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
			<Box>
				<h4>Working Image</h4>
				<Image
					root={{
						sx: { maxWidth: 300, border: "1px solid #ccc", borderRadius: 1 },
					}}
					image={{
						src: "src/assets/img/youths2.webp",
						alt: "Youth activities",
					}}
				/>
			</Box>
			<Box>
				<h4>Broken Image (for testing error states)</h4>
				<Image
					root={{
						sx: { maxWidth: 300, border: "1px solid #ccc", borderRadius: 1 },
					}}
					image={{
						src: "src/assets/img/non-existent-image.jpg",
						alt: "This image doesn't exist",
					}}
				/>
			</Box>
		</Box>
	),
	parameters: {
		docs: {
			description: {
				story:
					"Demonstrates how the component handles both working and broken image states.",
			},
		},
	},
};

export const DifferentFormats: Story = {
	render: () => (
		<Box
			sx={{
				display: "grid",
				gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
				gap: 2,
			}}
		>
			<Box>
				<h5>WebP Image (native)</h5>
				<Image
					root={{ sx: { border: "1px solid #ccc", borderRadius: 1 } }}
					image={{
						src: "src/assets/img/members4.webp",
						alt: "WebP format image",
					}}
				/>
			</Box>
			<Box>
				<h5>PNG Image (with WebP conversion)</h5>
				<Image
					root={{ sx: { border: "1px solid #ccc", borderRadius: 1 } }}
					image={{
						src: "src/assets/NY United Logo small.png",
						alt: "PNG format image",
					}}
				/>
			</Box>
		</Box>
	),
	parameters: {
		docs: {
			description: {
				story:
					"Shows how the component handles different image formats and WebP conversion.",
			},
		},
	},
};
