import type { UserDT } from "@/api";
import { UserEditor } from "@forms/collection";
import { describe, it, render } from "@test/index.ts";
import { users } from "@test/mock_data";
import { SnackbarProvider } from "notistack";

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
