import {
    beforeEach,
    describe,
    expect,
    fireEvent,
    it,
    screen,
    vi,
    waitFor,
} from "../../test/index";
import { render } from "../../test/vitest-setup.tsx";
import ConfirmationButton from "./ConfirmationButton";

describe("ConfirmationButton", () => {
	const defaultProps = {
		children: "Test Button",
		onClick: vi.fn(),
	};

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("renders the button with children", () => {
		render(<ConfirmationButton {...defaultProps} />);

		expect(
			screen.getByRole("button", {
				name: /test button/i,
			}),
		).toBeInTheDocument();
	});

	it("calls onClick directly when shouldConfirm is false", () => {
		render(<ConfirmationButton {...defaultProps} shouldConfirm={false} />);

		const button = screen.getByRole("button", { name: "Test Button" });
		fireEvent.click(button);

		expect(defaultProps.onClick).toHaveBeenCalledTimes(1);
	});

	it("calls onClick directly when shouldConfirm is not provided (defaults to false)", () => {
		render(<ConfirmationButton {...defaultProps} />);

		const button = screen.getByRole("button", { name: "Test Button" });
		fireEvent.click(button);

		expect(defaultProps.onClick).toHaveBeenCalledTimes(1);
	});

	it("shows confirmation dialog when shouldConfirm is true", () => {
		render(
			<ConfirmationButton
				{...defaultProps}
				shouldConfirm={true}
				confirmationTitle="Test Confirmation"
				confirmationContent="Are you sure?"
			/>,
		);

		const button = screen.getByRole("button", { name: "Test Button" });
		fireEvent.click(button);

		expect(screen.getByText("Test Confirmation")).toBeInTheDocument();
		expect(screen.getByText("Are you sure?")).toBeInTheDocument();
		expect(defaultProps.onClick).not.toHaveBeenCalled();
	});

	it("closes dialog and does not call onClick when cancel is clicked", async () => {
		render(
			<ConfirmationButton
				{...defaultProps}
				shouldConfirm={true}
				confirmationTitle="Test Confirmation"
			/>,
		);

		const button = screen.getByRole("button", { name: "Test Button" });
		fireEvent.click(button);

		const cancelButton = screen.getByRole("button", { name: "Cancel" });
		fireEvent.click(cancelButton);

		await waitFor(() => {
			expect(screen.queryByText("Test Confirmation")).not.toBeInTheDocument();
		});

		expect(defaultProps.onClick).not.toHaveBeenCalled();
	});

	it("closes dialog and calls onClick when confirm is clicked", async () => {
		render(
			<ConfirmationButton
				{...defaultProps}
				shouldConfirm={true}
				confirmationTitle="Test Confirmation"
			/>,
		);

		const button = screen.getByRole("button", { name: "Test Button" });
		fireEvent.click(button);

		const confirmButton = screen.getByRole("button", { name: "Confirm" });
		fireEvent.click(confirmButton);

		await waitFor(() => {
			expect(screen.queryByText("Test Confirmation")).not.toBeInTheDocument();
		});

		expect(defaultProps.onClick).toHaveBeenCalledTimes(1);
	});

	it("uses custom labels for dialog buttons", () => {
		render(
			<ConfirmationButton
				{...defaultProps}
				shouldConfirm={true}
				cancelLabel="No"
				confirmLabel="Yes"
			/>,
		);

		const button = screen.getByRole("button", { name: "Test Button" });
		fireEvent.click(button);

		expect(screen.getByRole("button", { name: "No" })).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "Yes" })).toBeInTheDocument();
	});

	it("uses default confirmation title and content when not provided", () => {
		render(<ConfirmationButton {...defaultProps} shouldConfirm={true} />);

		const button = screen.getByRole("button", { name: "Test Button" });
		fireEvent.click(button);

		expect(screen.getByText("Confirm Action")).toBeInTheDocument();
		expect(
			screen.getByText("Are you sure you want to proceed?"),
		).toBeInTheDocument();
	});

	it("passes through button props correctly", () => {
		render(
			<ConfirmationButton
				{...defaultProps}
				variant="outlined"
				color="secondary"
				disabled={true}
			/>,
		);

		const button = screen.getByRole("button", { name: "Test Button" });
		expect(button).toBeDisabled();
		expect(button).toHaveClass("MuiButton-outlined");
		expect(button).toHaveClass("MuiButton-colorSecondary");
	});

	it('renders as an IconButton when confirmVariant is "icon"', () => {
		render(
			<ConfirmationButton
				{...defaultProps}
				confirmVariant="icon"
				shouldConfirm={true}
			>
				<span>Icon</span>
			</ConfirmationButton>,
		);

		const iconButton = screen.getByRole("button", { name: "Icon" });
		expect(iconButton).toBeInTheDocument();
		expect(iconButton.tagName).toBe("BUTTON");
		expect(iconButton).toHaveClass("MuiIconButton-root");
	});
	it("calls onClick when confirmVariant is 'icon' and shouldConfirm is false", () => {
		render(
			<ConfirmationButton
				{...defaultProps}
				confirmVariant="icon"
				shouldConfirm={false}
			>
				<span>Icon</span>
			</ConfirmationButton>,
		);
		const iconButton = screen.getByRole("button", { name: "Icon" });
		fireEvent.click(iconButton);
		expect(defaultProps.onClick).toHaveBeenCalledTimes(1);
	});
	it("does not show confirmation dialog when confirmVariant is 'icon' and shouldConfirm is false", () => {
		render(
			<ConfirmationButton
				{...defaultProps}
				confirmVariant="icon"
				shouldConfirm={false}
			>
				<span>Icon</span>
			</ConfirmationButton>,
		);

		const iconButton = screen.getByRole("button", { name: "Icon" });
		fireEvent.click(iconButton);

		expect(screen.queryByText("Confirm Action")).not.toBeInTheDocument();
		expect(
			screen.queryByText("Are you sure you want to proceed?"),
		).not.toBeInTheDocument();
	});
});
