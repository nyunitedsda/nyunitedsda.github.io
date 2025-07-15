import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import RegisterModal from "./RegisterModal";

describe("RegisterModal", () => {
	it("renders RegisterModal", () => {
		const { getByText } = render(
			<RegisterModal
				open={false}
				onClose={(): void => {
					throw new Error("Function not implemented.");
				}}
			/>,
		);

		expect(getByText("RegisterModal Component")).toBeInTheDocument();
	});
});
