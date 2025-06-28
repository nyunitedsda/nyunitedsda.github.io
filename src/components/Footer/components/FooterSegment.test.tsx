import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import AppProvider from "../../../components/AppProvider/AppProvider";
import FooterSegment from "./FooterSegment";

// Custom render function that wraps with AppProvider
const customRender = (ui: React.ReactElement, options = {}) => {
  return render(ui, { wrapper: AppProvider, ...options });
};

describe("FooterSegment", () => {
	const title = "Test Title";
	const subtitle = "Test Subtitle";
	const children = <div data-testid="child">Child Content</div>;
	const sx = { backgroundColor: "red" };

	it("renders the title in Typography h6", () => {
		const { getByText } = customRender(
			<FooterSegment title={title}>{children}</FooterSegment>,
		);
		const titleElement = getByText(title);
		expect(titleElement).toBeInTheDocument();
		expect(titleElement.tagName.toLowerCase()).toBe("h6");
	});

	it("renders the subtitle if provided", () => {
		const { getByText } = customRender(
			<FooterSegment title={title} subtitle={subtitle}>
				{children}
			</FooterSegment>,
		);
		const subtitleElement = getByText(subtitle);
		expect(subtitleElement).toBeInTheDocument();
		expect(subtitleElement.tagName.toLowerCase()).toBe("p");
	});

	it("does not render subtitle Typography if subtitle is not provided", () => {
		const { queryByText } = customRender(
			<FooterSegment title={title}>{children}</FooterSegment>,
		);
		expect(queryByText(subtitle)).toBeNull();
	});

	it("renders children inside Box", () => {
		const { getByTestId } = customRender(
			<FooterSegment title={title}>{children}</FooterSegment>,
		);
		expect(getByTestId("child")).toBeInTheDocument();
	});

	it("passes sx prop to Grid", () => {
		const { container } = customRender(
			<FooterSegment title={title} sx={sx}>
				{children}
			</FooterSegment>,
		);
		// MUI applies sx as inline style, so check for backgroundColor
		const grid = container.querySelector(".MuiGrid-root");
		expect(grid).toHaveStyle("background-color: rgb(255, 0, 0)");
	});
});
