import { ExitToAppOutlined } from "@mui/icons-material";
import Box from "@mui/material/Box";
// biome-ignore lint/nursery/noUnresolvedImports: Storybook types are intentionally imported from @storybook/react-vite
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { action } from "storybook/actions";
import CarouselArrowControl from "./CarouselArrowControl";

// Simple mock that provides what the component needs
const createMockEmblaApi = (
	totalSlides: number = 5,
	currentIndex: number = 0,
	canLoop: boolean = false,
) => {
	let selectedIndex = currentIndex;
	const listeners: { [key: string]: ((api: any) => void)[] } = {};

	const triggerListeners = (event: string) => {
		if (listeners[event]) {
			listeners[event].forEach((callback) => callback(mockApi));
		}
	};

	const mockApi = {
		selectedScrollSnap: () => selectedIndex,
		canScrollPrev: () => canLoop || selectedIndex > 0,
		canScrollNext: () => canLoop || selectedIndex < totalSlides - 1,
		scrollPrev: () => {
			if (mockApi.canScrollPrev()) {
				selectedIndex =
					selectedIndex > 0
						? selectedIndex - 1
						: canLoop
							? totalSlides - 1
							: selectedIndex;
				action("scrollPrev")(`Moved to slide ${selectedIndex + 1}`);
				triggerListeners("select");
			}
		},
		scrollNext: () => {
			if (mockApi.canScrollNext()) {
				selectedIndex =
					selectedIndex < totalSlides - 1
						? selectedIndex + 1
						: canLoop
							? 0
							: selectedIndex;
				action("scrollNext")(`Moved to slide ${selectedIndex + 1}`);
				triggerListeners("select");
			}
		},
		on: (event: string, callback: (api: any) => void) => {
			if (!listeners[event]) {
				listeners[event] = [];
			}
			listeners[event].push(callback);

			// Immediately call select for setup
			if (event === "select") {
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

const meta: Meta<typeof CarouselArrowControl> = {
	title: "Components/Carousel/CarouselArrowControl",
	component: CarouselArrowControl,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"Arrow navigation controls for carousel components. Provides previous and next buttons with automatic disabled states at the start/end of the carousel.",
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
			description: "Callback fired when an arrow button is clicked",
			action: "arrow clicked",
		},
	},
	decorators: [
		(Story) => (
			<Box
				sx={{
					p: 4,
					"& .embla__buttons": {
						gap: 2,
					},
					"& .embla__button": {
						borderRadius: "50%",
						minWidth: 48,
						height: 48,
						"&:disabled": {
							opacity: 0.3,
						},
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
const InteractiveCarouselArrows = ({
	totalSlides = 5,
	initialIndex = 0,
	canLoop = false,
}: {
	totalSlides?: number;
	initialIndex?: number;
	canLoop?: boolean;
}) => {
	const [currentSlide, setCurrentSlide] = useState(initialIndex);
	const [api] = useState(() => {
		const mockApi = createMockEmblaApi(totalSlides, initialIndex, canLoop);

		// Override the scroll methods to update our state
		const originalScrollPrev = mockApi.scrollPrev;
		const originalScrollNext = mockApi.scrollNext;

		mockApi.scrollPrev = () => {
			originalScrollPrev();
			setCurrentSlide(mockApi.selectedScrollSnap());
		};

		mockApi.scrollNext = () => {
			originalScrollNext();
			setCurrentSlide(mockApi.selectedScrollSnap());
		};

		return mockApi;
	});

	return (
		<div>
			<Box sx={{ mb: 2, textAlign: "center", color: "text.secondary" }}>
				Current slide: {currentSlide + 1} of {totalSlides}
				{canLoop && " (Loop enabled)"}
			</Box>
			<CarouselArrowControl
				api={api as any}
				onButtonClick={action("onButtonClick")}
			/>
		</div>
	);
};

export const Default: Story = {
	render: () => <InteractiveCarouselArrows />,
	parameters: {
		docs: {
			description: {
				story:
					"Default carousel arrow controls with 5 slides. Previous button is disabled at the start, next button is disabled at the end.",
			},
		},
	},
};

export const AtBeginning: Story = {
	render: () => <InteractiveCarouselArrows totalSlides={5} initialIndex={0} />,
	parameters: {
		docs: {
			description: {
				story:
					"Arrow controls at the beginning of the carousel. Previous button should be disabled.",
			},
		},
	},
};

export const AtEnd: Story = {
	render: () => <InteractiveCarouselArrows totalSlides={5} initialIndex={4} />,
	parameters: {
		docs: {
			description: {
				story:
					"Arrow controls at the end of the carousel. Next button should be disabled.",
			},
		},
	},
};

export const InMiddle: Story = {
	render: () => <InteractiveCarouselArrows totalSlides={5} initialIndex={2} />,
	parameters: {
		docs: {
			description: {
				story:
					"Arrow controls in the middle of the carousel. Both buttons should be enabled.",
			},
		},
	},
};

export const WithLoop: Story = {
	render: () => (
		<InteractiveCarouselArrows
			totalSlides={5}
			initialIndex={0}
			canLoop={true}
		/>
	),
	parameters: {
		docs: {
			description: {
				story:
					"Arrow controls with loop enabled. Both buttons should always be enabled.",
			},
		},
	},
};

export const SingleSlide: Story = {
	render: () => <InteractiveCarouselArrows totalSlides={1} initialIndex={0} />,
	parameters: {
		docs: {
			description: {
				story:
					"Arrow controls with only one slide. Both buttons should be disabled.",
			},
		},
	},
};

export const TwoSlides: Story = {
	render: () => <InteractiveCarouselArrows totalSlides={2} initialIndex={0} />,
	parameters: {
		docs: {
			description: {
				story: "Arrow controls with two slides at the beginning.",
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
				story:
					"Arrow controls without an API. Both buttons should be disabled.",
			},
		},
	},
};

// Individual button stories
export const PrevButtonOnly: Story = {
	render: () => {
		const api = createMockEmblaApi(5, 2);
		return (
			<Box sx={{ "& .embla__button--next": { display: "none" } }}>
				<CarouselArrowControl
					api={api as any}
					onButtonClick={action("onButtonClick")}
				/>
			</Box>
		);
	},
	parameters: {
		docs: {
			description: {
				story:
					"Only the previous button visible (next button hidden with CSS).",
			},
		},
	},
};

export const NextButtonOnly: Story = {
	render: () => {
		const api = createMockEmblaApi(5, 2);
		return (
			<Box sx={{ "& .embla__button--prev": { display: "none" } }}>
				<CarouselArrowControl
					api={api as any}
					onButtonClick={action("onButtonClick")}
				/>
			</Box>
		);
	},
	parameters: {
		docs: {
			description: {
				story:
					"Only the next button visible (previous button hidden with CSS).",
			},
		},
	},
};

export const WithCustomIcons: Story = {
	render: () => {
		const api = createMockEmblaApi(5, 2);
		return (
			<CarouselArrowControl
				api={api as any}
				onButtonClick={action("onButtonClick")}
				prevIcon={<ExitToAppOutlined sx={{ transform: "rotate(180deg)" }} />}
				nextIcon={<ExitToAppOutlined />}
				buttonProps={{
					size: "large",
					color: "error",
				}}
			/>
		);
	},
	parameters: {
		docs: {
			description: {
				story:
					"Carousel arrow controls with custom navigate icons (NavigateBefore, NavigateNext).",
			},
		},
	},
};
