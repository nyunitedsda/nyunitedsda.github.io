import "@testing-library/jest-dom";
import { SnackbarProvider } from "notistack";
import { render } from "../../../test/vitest-setup";
import { describe, it } from "../../../utils";
import UserEditor from "./UserEditor";

describe("UserEditor", () => {
	it("renders UserEditor", () => {
		render(
			<SnackbarProvider>
				<UserEditor open={true} onClose={() => {}} onSuccess={() => {}} />
			</SnackbarProvider>,
		);
	});
});
