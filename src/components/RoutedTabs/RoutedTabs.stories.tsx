import RoutedTabs, { type RoutedTabsProps } from "@components/RoutedTabs";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof RoutedTabs> = {
	title: "Components/RoutedTabs",
	component: RoutedTabs,
	parameters: {
		docs: { autodocs: true },
		// Storybook Addon Links can be used in docs via markdown or in controls
	},
	tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof RoutedTabs>;

const tabItems: RoutedTabsProps["tabItems"] = [
	{ id: 0, tag: "default", label: "Tab 1", content: "Tab 1 Content" },
	{ id: 1, tag: "with-links", label: "Tab 2", content: "Tab 2 Content" },
	{ id: 2, tag: "tab-3", label: "Tab 3", content: "Tab 3 Content" },
];

export const Default: Story = {
	args: {
		baseUrl:
			"http://localhost:6006/?path=/story/components-routedtabs--default",
		tabItems,
	},
	parameters: {
		docs: {
			description: {
				story:
					"Basic usage of RoutedTabs. [See more components](?path=/story/components-routedtabs)",
			},
		},
	},
};

export const WithLinks: Story = {
	args: {
		baseUrl:
			"http://localhost:6006/?path=/story/components-routedtabs--with-links",
		tabItems: [
			...tabItems,
			{
				id: 3,
				tag: "tab-link",
				label: "Go to Home",
				content: '<a href="/">Home Link</a>',
			},
		],
	},
	parameters: {
		docs: {
			description: {
				story:
					"Tab with a link. [Go to Home](/) or [See Default](?path=/story/components-routedtabs--default)",
			},
		},
	},
};
