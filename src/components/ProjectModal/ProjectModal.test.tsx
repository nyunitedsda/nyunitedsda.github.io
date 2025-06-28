import { fireEvent, screen } from "@testing-library/react";
import {
	beforeEach,
	describe,
	expect,
	it,
	render,
	vi,
} from "../../utils/index";
import ProjectModal from "./ProjectModal";

const mockOnClose = vi.fn();
describe("ProjectModal", () => {
	const defaultProps = {
		open: true,
		onClose: mockOnClose,
		ariaText: "test-modal",
		children: <div>Test Modal Content</div>,
	};

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("renders modal content when open", () => {
		render(<ProjectModal {...defaultProps} />);

		expect(screen.getByText("Test Modal Content")).toBeInTheDocument();
	});

	it("does not render modal content when closed", () => {
		render(<ProjectModal {...defaultProps} open={false} />);

		expect(screen.queryByText("Test Modal Content")).not.toBeInTheDocument();
	});

	it("calls onClose when backdrop is clicked", () => {
		render(<ProjectModal {...defaultProps} />);

		// Click on the backdrop (the modal backdrop element)
		const backdrop = document.querySelector(".MuiBackdrop-root");
		if (backdrop) {
			fireEvent.click(backdrop);
		}

		expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
	});

	it("calls onClose when Escape key is pressed", () => {
		render(<ProjectModal {...defaultProps} />);

		fireEvent.click(screen.getByText(/test modal content/i));
		fireEvent.keyDown(screen.getByText(/test modal content/i), {
			key: "Escape",
			code: "Escape",
		});

		expect(mockOnClose).toHaveBeenCalledTimes(1);
	});

	it("applies correct aria attributes", () => {
		render(<ProjectModal {...defaultProps} ariaText="custom-modal" />);

		const modal = screen.getByRole("presentation");
		expect(modal).toHaveAttribute(
			"aria-labelledby",
			"custom-modal-modal-title",
		);
		expect(modal).toHaveAttribute(
			"aria-describedby",
			"custom-modal-modal-description",
		);
	});

	it("applies default padding when zeroPadding is false", () => {
		render(<ProjectModal {...defaultProps} zeroPadding={false} />);

		const contentContainer =
			screen.getByText("Test Modal Content").parentElement;
		expect(contentContainer).toHaveStyle("padding: 16px"); // MUI default p=2 (16px)
	});

	it("applies zero padding when zeroPadding is true", () => {
		render(<ProjectModal {...defaultProps} zeroPadding={true} />);

		const contentContainer =
			screen.getByText("Test Modal Content").parentElement;
		expect(contentContainer).toHaveStyle("padding: 0px");
	});

	it("renders complex children content", () => {
		const complexChildren = (
			<div>
				<h2>Modal Title</h2>
				<p>Modal description</p>
				<button type="button">Action Button</button>
			</div>
		);

		render(<ProjectModal {...defaultProps}>{complexChildren}</ProjectModal>);

		expect(screen.getByText("Modal Title")).toBeInTheDocument();
		expect(screen.getByText("Modal description")).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: "Action Button" }),
		).toBeInTheDocument();
	});

	it("has correct default props behavior", () => {
		render(
			<ProjectModal open={true} onClose={vi.fn()}>
				<div>Content</div>
			</ProjectModal>,
		);

		expect(screen.getByText("Content")).toBeInTheDocument();
		// Should have default padding when zeroPadding is not specified
		const contentContainer = screen.getByText("Content").parentElement;
		expect(contentContainer).toHaveStyle("padding: 16px");
	});

	it("handles missing ariaText gracefully", () => {
		render(
			<ProjectModal open={true} onClose={vi.fn()}>
				<div>Content without aria text</div>
			</ProjectModal>,
		);

		expect(screen.getByText("Content without aria text")).toBeInTheDocument();
		// Should still render without crashing when ariaText is undefined
	});
});
