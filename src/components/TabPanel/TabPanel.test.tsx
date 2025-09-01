import TabPanel from "@components/TabPanel";
import { describe, expect, it, render } from "@test/index.ts";

describe("TabPanel", () => {
	it("renders TabPanel", () => {
		const { getByText } = render(
			<TabPanel index={0} value={0}>
				{"TabPanel Component"}
			</TabPanel>,
		);

		expect(getByText("TabPanel Component")).toBeInTheDocument();
	});

	it("renders children only when value equals index", () => {
		const { queryByText } = render(
			<TabPanel value={0} index={0}>
				Visible Content
			</TabPanel>,
		);
		expect(queryByText("Visible Content")).toBeInTheDocument();

		const { queryByText: queryByTextHidden } = render(
			<TabPanel value={1} index={0}>
				Hidden Content
			</TabPanel>,
		);
		expect(queryByTextHidden("Hidden Content")).not.toBeInTheDocument();
	});

	it("wraps children in Stack when value equals index", () => {
		const { container, getByText } = render(
			<TabPanel value={0} index={0}>
				Stacked Content
			</TabPanel>,
		);

		// First verify the content is present
		expect(getByText("Stacked Content")).toBeInTheDocument();

		// Check for the Stack component - it should be the direct parent of the text
		const stack = container.querySelector(".MuiStack-root");
		if (!stack) {
			// If no MuiStack-root, check if it's a different structure
			console.log("Container HTML:", container.innerHTML);
		}
		expect(stack).not.toBeNull();
		expect(stack).toContainHTML("Stacked Content");
	});

	it("sets correct accessibility attributes", () => {
		const { container } = render(
			<TabPanel value={2} index={2}>
				A11y Content
			</TabPanel>,
		);
		const tabPanel = container.querySelector('[role="tabpanel"]');
		expect(tabPanel).toHaveAttribute("id", "full-width-tabpanel-2");
		expect(tabPanel).toHaveAttribute("aria-labelledby", "full-width-tab-2");
	});
});
