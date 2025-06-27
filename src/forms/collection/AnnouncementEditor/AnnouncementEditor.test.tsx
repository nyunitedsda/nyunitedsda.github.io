import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import AnnouncementEditor from "./AnnouncementEditor";

describe("AnnouncementEditor", () => {
	it("renders AnnouncementEditor", () => {
		const { getByText } = render(<AnnouncementEditor />);

		expect(getByText("AnnouncementEditor Component")).toBeInTheDocument();
	});
});
