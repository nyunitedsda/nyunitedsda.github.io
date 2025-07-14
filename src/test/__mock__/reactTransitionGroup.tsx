import { vi } from "vitest";

vi.mock("react-transition-group", () => ({
	Transition: ({ children, in: inProp, ...props }: any) =>
		inProp ? <div {...props}>{children}</div> : null,
	TransitionGroup: ({ children, ...props }: any) => (
		<div {...props}>{children}</div>
	),
}));
