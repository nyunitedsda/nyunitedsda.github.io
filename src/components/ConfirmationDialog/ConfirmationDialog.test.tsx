import { describe, expect, it, render, screen } from "@test/index.ts";
import ConfirmationDialog from "./ConfirmationDialog";

describe("ConfirmationDialog", () => {
	it("renders ConfirmationDialog", () => {
		render(
			<ConfirmationDialog
				title={""}
				content={undefined}
				open={false}
				onConfirm={(): void => {
					throw new Error("Function not implemented.");
				}}
				onClose={(): void => {
					throw new Error("Function not implemented.");
				}}
			/>,
		);

		expect(screen).not.toThrow();
	});
});
