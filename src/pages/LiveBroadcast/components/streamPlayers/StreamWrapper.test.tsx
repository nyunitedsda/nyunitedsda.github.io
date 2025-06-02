import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import StreamWrapper from "./StreamDisplay";

describe("StreamWrapper Component", () => {
	it("it should render without error", async () => {
		expect(() =>
			render(<StreamWrapper>{"Stream component"}</StreamWrapper>),
		).not.toThrow();
	});
});
