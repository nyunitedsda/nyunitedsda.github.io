import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { UserDT } from "../../../api/request/databaseTypes";
import userData from "../../../test/mock_data/users";
import PasswordEditor from "./PasswordEditor";

describe("PasswordEditor", () => {
	it("renders PasswordEditor", () => {
		const { getByText } = render(<PasswordEditor data={userData[0] as UserDT} onClose={function (): void {
			throw new Error("Function not implemented.");
		}} onSuccess={function (_data?: UserDT): void {
			throw new Error("Function not implemented.");
		}} open={false} />);

		expect(getByText("PasswordEditor Component")).toBeInTheDocument();
	});
});
