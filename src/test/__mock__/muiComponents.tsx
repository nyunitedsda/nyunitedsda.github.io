import { vi } from "vitest";

// Mock problematic MUI components that cause scrollTop errors
vi.mock("@mui/material", async () => {
	const actual = await vi.importActual("@mui/material");
	return {
		...actual,
		Menu: ({ children, open, onClose, anchorEl, ...props }: any) =>
			open ? (
				<div data-testid="menu" id={props.id} {...props}>
					{children}
				</div>
			) : null,
		Grow: ({ children, in: inProp, ...props }: any) =>
			inProp ? <div {...props}>{children}</div> : null,
		MenuList: ({ children, ...props }: any) => (
			<div data-testid="menulist" {...props}>
				{children}
			</div>
		),
		MenuItem: ({ children, onClick, selected, ...props }: any) => (
			<button
				data-testid="menuitem"
				onClick={onClick}
				onKeyDown={(e) => {
					if (e.key === "Enter" || e.key === " ") {
						onClick?.(e);
					}
				}}
				tabIndex={0}
				className={selected ? "Mui-selected" : ""}
				{...props}
			>
				{children}
			</button>
		),
		Alert: ({ children, severity, ...props }: any) => (
			<div data-testid="alert" data-severity={severity} {...props}>
				{children}
			</div>
		),
		AlertTitle: ({ children, ...props }: any) => (
			<div data-testid="alert-title" {...props}>
				{children}
			</div>
		),
		Snackbar: ({ children, open, onClose, ...props }: any) =>
			open ? (
				<div data-testid="snackbar" {...props}>
					{children}
				</div>
			) : null,
	};
});

// Mock transitions and utils that cause issues
vi.mock("@mui/material/transitions", () => ({
	Grow: ({ children, in: inProp, ...props }: any) =>
		inProp ? <div {...props}>{children}</div> : null,
	Fade: ({ children, in: inProp, ...props }: any) =>
		inProp ? <div {...props}>{children}</div> : null,
	Slide: ({ children, in: inProp, ...props }: any) =>
		inProp ? <div {...props}>{children}</div> : null,
}));

// Mock the specific Grow component that's causing issues
vi.mock("@mui/material/Grow", () => ({
	default: ({ children, in: inProp, ...props }: any) =>
		inProp ? <div {...props}>{children}</div> : null,
}));

// Mock the transitions utils that cause scrollTop issues
vi.mock("@mui/material/transitions/utils", () => ({
	reflow: vi.fn(),
	getTransitionProps: vi.fn(() => ({})),
}));
