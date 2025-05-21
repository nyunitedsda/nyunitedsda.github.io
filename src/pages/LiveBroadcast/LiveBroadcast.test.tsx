import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import LiveBroadcast from "./LiveBroadcast";
import '@testing-library/jest-dom';

describe("LiveBroadcast", () => {
	it("renders LiveBroadcast", () => {
		const { getByText } = render(<LiveBroadcast />);

		expect(getByText("LiveBroadcast Component")).toBeInTheDocument();
	});
});
