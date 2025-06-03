import { render } from "@testing-library/react";
import { it, describe, expect } from "vitest";
import StreamWrapper from "./StreamWrapper";

describe("StreamWrapper Component", () => {
	it("it should render without error", async () => {
		expect(() =>
			render(<StreamWrapper>{"Stream component"}</StreamWrapper>),
		).not.toThrow();
	});
});
