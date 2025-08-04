import { Box } from "@mui/material";
// biome-ignore lint/nursery/noUnresolvedImports: Storybook types are intentionally imported from @storybook/react-vite
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { action } from "storybook/actions";
import CarouselDotControl from "./CarouselDotControl";

// Simple mock that provides just what the component needs
const createMockEmblaApi = (snapCount: number, initialIndex = 0) => {
	let selectedIndex = initialIndex;
	const scrollSnaps = Array.from({ length: snapCount }, (_, i) => i);
	const listeners: { [key: string]: ((api: any) => void)[] } = {};

	const mockApi = {
		scrollSnapList: () => scrollSnaps,
		selectedScrollSnap: () => selectedIndex,
		scrollTo: (index: number) => {
			selectedIndex = index;
			// Trigger select listeners
			if (listeners.select) {
				listeners.select.forEach((callback) => callback(mockApi));
			}
			action("scrollTo")(index);
		},
		on: (event: string, callback: (api: any) => void) => {
			if (!listeners[event]) {
				listeners[event] = [];
			}
			listeners[event].push(callback);

			// Immediately call init and select for setup
			if (event === "init" || event === "select") {
				callback(mockApi);
			}

			return mockApi;
		},
		off: (event: string, callback: (api: any) => void) => {
			if (listeners[event]) {
				const index = listeners[event].indexOf(callback);
				if (index > -1) {
					listeners[event].splice(index, 1);
				}
			}
			return mockApi;
		},
	};

	return mockApi;
};

const meta: Meta<typeof CarouselDotControl> = {
	title: "Components/Carousel/CarouselDotControl",
	component: CarouselDotControl,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"Dot navigation control for carousel components. Shows dots representing each slide and allows navigation by clicking dots.",
			},
		},
	},
	tags: ["autodocs"],
	argTypes: {
		api: {
			description: "Embla carousel API instance",
			control: false,
		},
		onButtonClick: {
			description: "Callback fired when a dot is clicked",
			action: "dot clicked",
		},
	},
	decorators: [
		(Story) => (
			<Box
				sx={{
					p: 4,
					"& .embla__dots": {
						display: "flex",
						gap: 1,
					},
					"& .embla__dot": {
						width: 12,
						height: 12,
						borderRadius: "50%",
						border: "none",
						backgroundColor: "#ccc",
						cursor: "pointer",
						transition: "background-color 0.2s ease",
						"&:hover": {
							backgroundColor: "#999",
						},
					},
					"& .embla__dot--selected": {
						backgroundColor: "#007bff",
					},
				}}
			>
				<Story />
			</Box>
		),
	],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Interactive wrapper component for stories
const InteractiveCarouselDots = ({
	snapCount,
	initialIndex = 0,
}: {
	snapCount: number;
	initialIndex?: number;
}) => {
	const [api] = useState(() => createMockEmblaApi(snapCount, initialIndex));

	return (
		<CarouselDotControl
			api={api as any} // Type assertion for the mock
			onButtonClick={action("onButtonClick")}
		/>
	);
};

export const Default: Story = {
	render: () => <InteractiveCarouselDots snapCount={5} />,
	parameters: {
		docs: {
			description: {
				story: "Default carousel dot control with 5 dots.",
			},
		},
	},
};

export const ThreeDots: Story = {
	render: () => <InteractiveCarouselDots snapCount={3} />,
	parameters: {
		docs: {
			description: {
				story: "Carousel dot control with 3 dots.",
			},
		},
	},
};

export const ManyDots: Story = {
	render: () => <InteractiveCarouselDots snapCount={10} />,
	parameters: {
		docs: {
			description: {
				story: "Carousel dot control with many dots (10).",
			},
		},
	},
};

export const SingleDot: Story = {
	render: () => <InteractiveCarouselDots snapCount={1} />,
	parameters: {
		docs: {
			description: {
				story: "Carousel dot control with only one dot.",
			},
		},
	},
};

export const SelectedAtEnd: Story = {
	render: () => <InteractiveCarouselDots snapCount={5} initialIndex={4} />,
	parameters: {
		docs: {
			description: {
				story: "Carousel dot control with the last dot initially selected.",
			},
		},
	},
};

export const WithoutAPI: Story = {
	args: {
		api: undefined,
		onButtonClick: action("onButtonClick"),
	},
	parameters: {
		docs: {
			description: {
				story: "Carousel dot control without an API (should show no dots).",
			},
		},
	},
};
