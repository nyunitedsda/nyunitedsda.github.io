import { describe, it, render } from "@test/index.ts";
import { users } from "@test/mock_data";
import type { UserDT } from "@/api";
import "@testing-library/jest-dom";
import { SnackbarProvider } from "notistack";
import UserEditor from "./UserEditor";

describe("UserEditor", () => {
	it("renders UserEditor", () => {
		render(
			<SnackbarProvider>
				<UserEditor
					open={true}
					onClose={() => {}}
					onSuccess={() => {}}
					data={users[0] as UserDT}
				/>
			</SnackbarProvider>,
		);
	});
});
