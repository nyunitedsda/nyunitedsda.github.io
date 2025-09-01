import type { UserDT } from "@/api";
import { describe, expect, it, render } from "@/test";
import { PasswordEditor } from "@forms/collection";
import { users as userData } from "@test/mock_data/";

describe("PasswordEditor", () => {
	it("renders PasswordEditor", () => {
		const { getByText } = render(
			<PasswordEditor
				data={userData[0] as UserDT}
				onClose={(): void => {
					throw new Error("Function not implemented.");
				}}
				onSuccess={(_data?: UserDT): void => {
					throw new Error("Function not implemented.");
				}}
				open={false}
			/>,
		);

		expect(getByText("PasswordEditor Component")).toBeInTheDocument();
	});
});
