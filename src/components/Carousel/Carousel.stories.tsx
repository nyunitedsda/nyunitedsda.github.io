import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import type { Meta, StoryObj } from "@storybook/react-vite";
import sliderImages from "../../pages/Home/sliderImages";
import Carousel from "./Carousel";

// Sample images from the project's assets
const sampleImages = [
	{
		...sliderImages[0],
		title: "Church Family",
	},
	{
		...sliderImages[8],
		title: "Our Members",
	},
	{
		...sliderImages[16],
		title: "Youth Ministry",
	},
	{
		...sliderImages[6],
		title: "Prayer Group",
	},
	{
		...sliderImages[7],
		title: "Giving Back",
	},
];

const meta: Meta<typeof Carousel> = {
	title: "Components/Carousel/Carousel",
	component: Carousel,
	tags: ["autodocs"],
	decorators: [
		(Story) => (
			<Box sx={{ maxWidth: "800px", margin: "0 auto", padding: 2 }}>
				<Story />
			</Box>
		),
	],
	parameters: {
		docs: {
			description: {
				component:
					"Embla carousel component with autoplay functionality. Supports custom options and Material-UI styling.",
			},
		},
	},
	argTypes: {
		autoplay: {
			control: "boolean",
			description: "Enable autoplay functionality",
		},
		options: {
			control: "object",
			description: "Embla carousel options",
		},
		userOptions: {
			control: "object",
			description: "Autoplay-specific options (only when autoplay is true)",
			if: { arg: "autoplay", eq: true },
		},
		sx: {
			control: "object",
			description: "Material-UI sx prop for custom styling",
		},
		children: {
			control: false,
			description: "Carousel slide content",
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample slide component for stories
const SampleSlide = ({
	image,
	index,
}: {
	image: (typeof sampleImages)[0];
	index: number;
}) => (
	<Box
		sx={{
			flex: "0 0 100%",
			minWidth: 0,
			padding: 1,
		}}
	>
		<Card sx={{ height: "300px" }}>
			<CardMedia
				component="img"
				height="200"
				image={image.src}
				alt={image.alt}
				sx={{ objectFit: "cover" }}
			/>
			<CardContent>
				<Typography variant="h6" component="div">
					{image.title}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					Slide {index + 1} - {image.alt}
				</Typography>
			</CardContent>
		</Card>
	</Box>
);

// Text-only slide component
const TextSlide = ({
	title,
	content,
	index,
}: {
	title: string;
	content: string;
	index: number;
}) => (
	<Box
		sx={{
			flex: "0 0 100%",
			minWidth: 0,
			padding: 2,
		}}
	>
		<Card
			sx={{
				height: "250px",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<CardContent sx={{ textAlign: "center" }}>
				<Typography variant="h4" component="div" gutterBottom>
					{title}
				</Typography>
				<Typography variant="body1" color="text.secondary">
					{content}
				</Typography>
				<Typography variant="caption" display="block" sx={{ mt: 2 }}>
					Slide {index + 1}
				</Typography>
			</CardContent>
		</Card>
	</Box>
);

export const Default: Story = {
	args: {
		autoplay: false,
		children: sampleImages.map((image, index) => (
			<SampleSlide
				key={JSON.stringify({ image, index })}
				image={image}
				index={index}
			/>
		)),
	} as any,
	parameters: {
		docs: {
			description: {
				story: "Default carousel with sample images. Autoplay is disabled.",
			},
		},
	},
};

export const WithAutoplay: Story = {
	args: {
		autoplay: true,
		userOptions: {},
		children: sampleImages.map((image, index) => (
			<SampleSlide
				key={JSON.stringify({ image, index })}
				image={image}
				index={index}
			/>
		)),
	},
	parameters: {
		docs: {
			description: {
				story:
					"Carousel with autoplay enabled. Slides will change automatically.",
			},
		},
	},
};

export const TextSlides: Story = {
	args: {
		autoplay: false,
		children: [
			<TextSlide
				key={0}
				title="Welcome"
				content="Welcome to our church community"
				index={0}
			/>,
			<TextSlide
				key={1}
				title="Services"
				content="Join us for our weekly services"
				index={1}
			/>,
			<TextSlide
				key={2}
				title="Community"
				content="Be part of our loving community"
				index={2}
			/>,
		],
	} as any,
	parameters: {
		docs: {
			description: {
				story:
					"Carousel with text-only slides. Useful for announcements or messages.",
			},
		},
	},
};

export const SingleSlide: Story = {
	args: {
		autoplay: false,
		children: [<SampleSlide key={0} image={sampleImages[0]} index={0} />],
	} as any,
	parameters: {
		docs: {
			description: {
				story:
					"Carousel with a single slide. Useful for highlighting important content.",
			},
		},
	},
};

export const ManySlides: Story = {
	args: {
		autoplay: false,
		children: [
			...sampleImages.map((image, index) => (
				<SampleSlide
					key={JSON.stringify({ image, index })}
					image={image}
					index={index}
				/>
			)),
			...sampleImages.map((image, index) => (
				<SampleSlide
					key={JSON.stringify({ image, index: index + 5 })}
					image={image}
					index={index + 5}
				/>
			)),
		],
	} as any,
	parameters: {
		docs: {
			description: {
				story:
					"Carousel with many slides. Demonstrates how the carousel handles multiple items.",
			},
		},
	},
};

export const WithCustomOptions: Story = {
	args: {
		autoplay: false,
		options: {
			align: "center",
			slidesToScroll: 2,
			containScroll: "trimSnaps",
		},
		children: sampleImages.map((image, index) => (
			<Box
				key={JSON.stringify({ image, index })}
				sx={{
					flex: "0 0 50%",
					minWidth: 0,
					padding: 1,
				}}
			>
				<Card sx={{ height: "200px" }}>
					<CardMedia
						component="img"
						height="120"
						image={image.src}
						alt={image.alt}
						sx={{ objectFit: "cover" }}
					/>
					<CardContent>
						<Typography variant="body2">{image.title}</Typography>
					</CardContent>
				</Card>
			</Box>
		)),
	} as any,
	parameters: {
		docs: {
			description: {
				story:
					"Carousel with custom options. Adjusts alignment and scroll behavior.",
			},
		},
	},
};

export const WithCustomStyling: Story = {
	args: {
		autoplay: false,
		sx: {
			"& .embla": {
				border: "2px solid #1976d2",
				borderRadius: "12px",
				overflow: "hidden",
			},
			"& .embla__controls": {
				backgroundColor: "#f5f5f5",
				padding: 2,
				borderRadius: "0 0 12px 12px",
			},
		},
		children: sampleImages
			.slice(0, 3)
			.map((image, index) => (
				<SampleSlide
					key={JSON.stringify({ image, index })}
					image={image}
					index={index}
				/>
			)),
	} as any,
	parameters: {
		docs: {
			description: {
				story:
					"Carousel with custom Material-UI styling. Demonstrates how to apply styles using the sx prop.",
			},
		},
	},
};

export const FastAutoplay: Story = {
	args: {
		autoplay: true,
		userOptions: {
			delay: 2000, // 2 seconds
		},
		children: sampleImages.map((image, index) => (
			<SampleSlide
				key={JSON.stringify({ image, index })}
				image={image}
				index={index}
			/>
		)),
	},
	parameters: {
		docs: {
			description: {
				story: "Carousel with fast autoplay. Slides change every 2 seconds.",
			},
		},
	},
};
