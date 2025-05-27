import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import TabPanel from "./TabPanel";

describe("TabPanel", () => {
	it("renders TabPanel", () => {
		const { getByText } = render(<TabPanel />);

		expect(getByText("TabPanel Component")).toBeInTheDocument();
	});
});
