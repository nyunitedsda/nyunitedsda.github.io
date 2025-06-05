import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import RoutedTabs from "./RoutedTabs";

describe("RoutedTabs", () => {
	it("renders RoutedTabs", () => {
		const { getByText } = render(<RoutedTabs tabItems={[]} />);

		expect(getByText("RoutedTabs Component")).toBeInTheDocument();
	});
});
