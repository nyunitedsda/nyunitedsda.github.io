import { render } from "../../utils/vitest-setup";
import TabPanel from "./TabPanel";

describe("TabPanel", () => {
	it("renders TabPanel", () => {
		const { getByText } = render(
			<TabPanel index={0} value={0} >
				{'TabPanel Component'}
			</TabPanel>
		);

		expect(getByText("TabPanel Component")).toBeInTheDocument();
	});

	it("renders children only when value equals index", () => {
		const { queryByText } = render(
			<TabPanel value={0} index={0}>Visible Content</TabPanel>
		);
		expect(queryByText("Visible Content")).toBeInTheDocument();

		const { queryByText: queryByTextHidden } = render(
			<TabPanel value={1} index={0}>Hidden Content</TabPanel>
		);
		expect(queryByTextHidden("Hidden Content")).not.toBeInTheDocument();
	});

	it("wraps children in Stack when enableStack is true", () => {
		const { container } = render(
			<TabPanel value={0} index={0} enableStack>Stacked Content</TabPanel>
		);
		// MUI Stack renders as a div with data-testid="Stack" or class "MuiStack-root"
		const stack = container.querySelector(".MuiStack-root");
		expect(stack).toBeTruthy();
		expect(stack?.textContent).toContain("Stacked Content");
	});

	it("passes stackProps to Stack", () => {
		const { container } = render(
			<TabPanel
				value={0}
				index={0}
				enableStack
				//@ts-ignore
				stackProps={{ direction: "row", "data-testid": "custom-stack" }}
			>
				StackProps Content
			</TabPanel>
		);
		const stack = container.querySelector('[data-testid="custom-stack"]');
		expect(stack).toBeTruthy();
		expect(stack?.textContent).toContain("StackProps Content");
	});

	it("sets correct accessibility attributes", () => {
		const { container } = render(
			<TabPanel value={2} index={2}>A11y Content</TabPanel>
		);
		const tabPanel = container.querySelector('[role="tabpanel"]');
		expect(tabPanel).toHaveAttribute("id", "full-width-tabpanel-2");
		expect(tabPanel).toHaveAttribute("aria-labelledby", "full-width-tab-2");
	});
});