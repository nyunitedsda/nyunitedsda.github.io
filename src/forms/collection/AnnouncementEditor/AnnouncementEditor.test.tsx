import { AnnouncementEditor } from "@forms/collection";
import { describe, expect, it, render } from "@test/index";

describe("AnnouncementEditor", () => {
	it("renders AnnouncementEditor", () => {
		const { getByText } = render(
			<AnnouncementEditor
				open={false}
				onClose={(): void => {
					throw new Error("Function not implemented.");
				}}
			/>,
		);

		expect(getByText("AnnouncementEditor Component")).toBeInTheDocument();
	});
});
