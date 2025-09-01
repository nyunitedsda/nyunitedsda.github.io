import { DonationEditor } from "@forms/collection";
import { describe, expect, it, render } from "@/test";

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
