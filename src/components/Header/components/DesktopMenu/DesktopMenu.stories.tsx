import { DesktopMenu } from "@components/Header";
import type { RouteMenu } from "@hooks/routes";
import type { Meta, StoryObj } from "@storybook/react-vite";

const menuList: RouteMenu[] = [
	{ id: "1", name: "Home", path: "/" },
	{ id: "2", name: "About", path: "/about" },
	{ id: "3", name: "Blog", path: "/blog" },
	{ id: "4", name: "Contact", path: "/contact" },
	{ id: "5", name: "Donations", path: "/donations" },
	{ id: "6", name: "Live", path: "/live" },
	{ id: "7", name: "Admin", path: "/admin" },
];

const meta: Meta<typeof DesktopMenu> = {
	title: "Components/Header/DesktopMenu",
	component: DesktopMenu,
};
export default meta;

type Story = StoryObj<typeof DesktopMenu>;

const isActive = (activePath: string) => (path: string) => path === activePath;

export const Default: Story = {
	args: {
		menuList,
		isActive: isActive("/"),
	},
};

export const WithLongMenu: Story = {
	args: {
		menuList: [
			...menuList,
			{ id: "8", name: "ExtraLongMenuItemName", path: "/extra" },
			{ id: "9", name: "AnotherMenu", path: "/another" },
		],
		isActive: isActive("/about"),
	},
};
