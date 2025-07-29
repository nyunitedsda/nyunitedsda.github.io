import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import DesktopMenu from "./DesktopMenu";

describe("DesktopMenu", () => {
	it("renders DesktopMenu", () => {
		const { getByText } = render(<DesktopMenu />);

		expect(getByText("DesktopMenu Component")).toBeInTheDocument();
	});
});
