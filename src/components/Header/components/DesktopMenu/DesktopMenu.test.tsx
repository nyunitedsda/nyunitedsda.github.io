import { DesktopMenu } from "@components/Header";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("DesktopMenu", () => {
	it("renders DesktopMenu", () => {
		const { getByText } = render(
			<DesktopMenu
				menuList={[]}
				isActive={(): boolean => {
					throw new Error("Function not implemented.");
				}}
			/>,
		);

		expect(getByText("DesktopMenu Component")).toBeInTheDocument();
	});
});
