import "@testing-library/jest-dom";
import { vi } from "vitest";
import { describe, expect, fireEvent, it, screen } from "../../../utils/index";
import { render } from "../../../utils/vitest-setup";
import SubMenuDrawerItem from "./SubMenuDrawerItem";

const mockOnClick = vi.fn();
const defaultProps = {
	id: "parent",
	name: "Parent",
	path: "/parent",
	isActiveChild: (path: string) => path === "/parent",
	isActiveParent: false,
	onClick: mockOnClick,
	icon: "icon",
	children: [
		{ id: "child1", name: "Child 1", path: "/parent/child1" },
		{ id: "child2", name: "Child 2", path: "/parent/child2" },
	],
};

describe("SubMenuDrawerItem", () => {
	it("renders the parent menu item", () => {
		render(<SubMenuDrawerItem {...defaultProps} />);

		expect(screen.getByTestId("ExpandMoreRoundedIcon")).toBeInTheDocument();
		expect(
			screen.getAllByRole("menuitem", {
				name: /icon parent/i,
			}).length,
		).toBe(1);
		expect(screen.getByText(defaultProps.name)).toBeInTheDocument();
	});

	it("initially renders in collapsed state (children not visible)", () => {
		render(<SubMenuDrawerItem {...defaultProps} />);

		expect(
			screen.getAllByRole("menuitem", {
				name: /icon parent/i,
			}).length,
		).toBe(1);
		expect(screen.getByTestId("ExpandMoreRoundedIcon")).toBeInTheDocument();
	});

	it("expands when clicked to show children", () => {
		render(<SubMenuDrawerItem {...defaultProps} />);

		expect(
			screen.getAllByRole("menuitem", {
				name: /icon parent/i,
			}).length,
		).toBe(1);

		const parent = screen.queryAllByRole("menuitem")[0];

		expect(parent).toBeInTheDocument();

		fireEvent.click(parent);

		expect(screen.queryAllByRole("menuitem").length).toBe(3);
	});

	it("collapses when clicked again", () => {
		const name = [defaultProps.name];
		defaultProps.children.forEach((i) => name.push(i.name));

		render(<SubMenuDrawerItem {...defaultProps} />);

		expect(screen.queryAllByRole("menuitem").length).toBe(1);
		const parent = screen.queryAllByRole("menuitem")[0];

		// First click to expand
		fireEvent.click(parent);
		expect(screen.queryAllByRole("menuitem").length).toBe(3);

		for (const n of name) {
			expect(screen.getByText(n)).toBeInTheDocument();
		}

		// Second click to collapse
		fireEvent.click(parent);
		expect(screen.queryAllByRole("menuitem").length).toBe(1);
	});

	it("passes correct isActive state to items", () => {
		const customIsActive = vi
			.fn()
			.mockImplementation((path) => path === defaultProps.children[0].path);
		render(
			<SubMenuDrawerItem
				{...defaultProps}
				isActiveChild={customIsActive}
				isActiveParent={true}
			/>,
		);

		expect(screen.queryAllByRole("menuitem").length).toBe(3);
		const parent = screen.queryAllByRole("menuitem")[0];

		expect(parent.hasAttribute("aria-current")).toBeFalsy();

		expect(screen.queryAllByRole("menuitem")[1]).toHaveAttribute(
			"aria-current",
			"page",
		);

		expect(customIsActive).toHaveBeenCalledWith("/parent/child1");

		// Second child
		expect(screen.queryAllByRole("menuitem")[2]).not.toHaveAttribute(
			"aria-current",
		);
		expect(customIsActive).toHaveBeenCalledWith("/parent/child2");

		fireEvent.click(parent);
		expect(parent).toHaveAttribute("aria-current", "page");
	});

	it("triggers onClick with correct path when children are clicked", () => {
		const onClick = vi.fn();

		render(
			<SubMenuDrawerItem
				{...defaultProps}
				onClick={onClick}
				isActiveParent={true}
			/>,
		);

		// Click on first child
		const firstChild = screen.queryAllByRole("menuitem")[1];

		expect(firstChild).toHaveTextContent(defaultProps.children[0].name);

		fireEvent.click(firstChild);
		expect(onClick).toHaveBeenCalledWith(defaultProps.children[0].path);

		// Click on second child
		const secondChild = firstChild.nextElementSibling as Element;
		expect(secondChild).toHaveTextContent(defaultProps.children[1].name);

		fireEvent.click(secondChild);
		expect(onClick).toHaveBeenCalledWith(defaultProps.children[1].path);
	});
});
