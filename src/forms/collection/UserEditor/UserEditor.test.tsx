import "@testing-library/jest-dom";
import { SnackbarProvider } from "notistack";
import { render } from "../../../utils/vitest-setup";
import UserEditor from "./UserEditor";
import { describe, it } from "../../../utils";

describe("UserEditor", () => {
	it("renders UserEditor", () => {
		render(
			<SnackbarProvider>
				<UserEditor 
					open={true} 
					onClose={() => {}} 
					onSuccess={() => {}} 
				/>
			</SnackbarProvider>
		);
	});
});
