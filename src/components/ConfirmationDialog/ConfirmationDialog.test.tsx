import { describe, expect, it, screen } from "../../test/index.ts";
import { render } from "../../test/vitest-setup.tsx";
import ConfirmationDialog from "./ConfirmationDialog";

describe("ConfirmationDialog", () => {
	it("renders ConfirmationDialog", () => {
		const { getByText } = render(<ConfirmationDialog />);

		// expect(getByText("ConfirmationDialog Component")).toBeInTheDocument();
	});
});
