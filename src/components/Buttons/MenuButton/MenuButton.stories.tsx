import type { Meta, StoryObj } from "@storybook/react";
import type { RouteMenu } from "../../../hooks/routes/types";
import MenuButton from "./MenuButton";

const meta: Meta<typeof MenuButton> = {
	title: "Components/Buttons/MenuButton",
	component: MenuButton,
	tags: ["autodocs"],
	decorators: [
		(Story) => (
			<div style={{ width: "150px" }}>
				<Story />
			</div>
		),
	],
	argTypes: {
		isActive: { control: false },
		path: { control: "text" },
		children: { control: "text" },
		buttonProps: { control: "object" },
		menuItems: { control: "object" },
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleMenuItems: RouteMenu[] = [
	{ id: "home", name: "Home", path: "/home" },
	{ id: "about", name: "About", path: "/about" },
	{ id: "contact", name: "Contact", path: "/contact" },
];

export const NoMenu: Story = {
	args: {
		children: "Go Home",
		path: "",
		isActive: () => true,
		buttonProps: { onClick: () => ({}) },
		menuItems: undefined,
	},
};

export const WithMenu: Story = {
	args: {
		children: "Open Menu",
		menuItems: sampleMenuItems,
		isActive: () => false,
		buttonProps: {},
		path: "",
	},
};

export const ActiveMenuItem: Story = {
	args: {
		children: "My Menu",
		menuItems: sampleMenuItems,
		isActive: (p: string) => p === "/contact",
		buttonProps: {},
		path: "",
	},
};
