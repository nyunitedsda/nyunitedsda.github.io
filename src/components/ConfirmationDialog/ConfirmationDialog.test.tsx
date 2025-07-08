import { render } from "../../utils/vitest-setup.tsx";
import { describe, expect, it, screen } from "../../utils/index.ts";
import ConfirmationDialog from "./ConfirmationDialog";

describe("ConfirmationDialog", () => {
	it("renders ConfirmationDialog", () => {
		const { getByText } = render(<ConfirmationDialog />);

		expect(getByText("ConfirmationDialog Component")).toBeInTheDocument();
	});
});
