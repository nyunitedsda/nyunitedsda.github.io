import { describe, expect, it, render } from "@/test";
import { DonationEditor } from "@forms/collection";

describe("DonationEditor", () => {
	it("renders DonationEditor", () => {
		const { getByText } = render(
			<DonationEditor
				open={false}
				onClose={(): void => {
					throw new Error("Function not implemented.");
				}}
			/>,
		);

		expect(getByText("DonationEditor Component")).toBeInTheDocument();
	});
});
