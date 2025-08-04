// biome-ignore lint/nursery/noUnresolvedImports: Storybook types are intentionally imported from @storybook/react-vite
import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import RingLoader from "./RingLoader";

// Decorator to provide visual context for the loader
const LoaderDecorator = (Story: any, context: any) => {
	const { parameters } = context;
	const containerHeight = parameters?.containerHeight || "200px";

	return React.createElement(
		"div",
		{
			style: {
				padding: "16px",
				height: containerHeight,
				position: "relative",
				border: "1px dashed #ccc",
				borderRadius: "4px",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			},
		},
		React.createElement(Story),
	);
};

const meta: Meta<typeof RingLoader> = {
	title: "Components/Loaders/RingLoader",
	component: RingLoader,
	decorators: [LoaderDecorator],
	parameters: {
		docs: {
			description: {
				component:
					"A customizable ring loading spinner component built with react-spinners. The loader uses the app's primary theme color with transparency and is centered within its container.",
			},
		},
	},
	argTypes: {
		loading: {
			control: "boolean",
			description: "Whether the loader should be visible",
		},
		size: {
			control: { type: "range", min: 10, max: 200, step: 5 },
			description: "Size of the loader in pixels",
		},
		speedMultiplier: {
			control: { type: "range", min: 0.1, max: 3, step: 0.1 },
			description: "Speed multiplier for the animation",
		},
		color: {
			control: "color",
			description: "Color of the loader (overrides theme color)",
		},
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		loading: true,
	},
};

export const Small: Story = {
	args: {
		loading: true,
		size: 20,
	},
};

export const Large: Story = {
	args: {
		loading: true,
		size: 80,
	},
};

export const ExtraLarge: Story = {
	args: {
		loading: true,
		size: 120,
	},
	parameters: {
		containerHeight: "300px",
	},
};

export const CustomColor: Story = {
	args: {
		loading: true,
		color: "#ff6b35",
	},
};

export const FastAnimation: Story = {
	args: {
		loading: true,
		speedMultiplier: 2,
	},
};

export const SlowAnimation: Story = {
	args: {
		loading: true,
		speedMultiplier: 0.5,
	},
};

export const Hidden: Story = {
	args: {
		loading: false,
	},
};
