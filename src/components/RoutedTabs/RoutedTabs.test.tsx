import { describe, expect, it } from "vitest";
import { render } from "../../utils/vitest-setup.tsx";
import RoutedTabs from "./RoutedTabs";

describe("RoutedTabs", () => {
	it("renders RoutedTabs", () => {
		const tabItems = [
			{
				id: 1,
				tag: "tab1",
				label: "Test Tab",
				content: "Test Content",
			},
		];

		const { container } = render(
			<RoutedTabs tabItems={tabItems} baseUrl="/test" />,
		);

		// The component should render something, either tabs or skeleton
		expect(container.firstChild).toBeInTheDocument();

		// Look for skeleton since selectedTabId might not be set initially
		const skeleton = container.querySelector(".MuiSkeleton-root");
		if (skeleton) {
			expect(skeleton).toBeInTheDocument();
		} else {
			// Or look for the tabs structure
			const tabs = container.querySelector(".MuiTabs-root");
			expect(tabs).toBeInTheDocument();
		}
	});
});
