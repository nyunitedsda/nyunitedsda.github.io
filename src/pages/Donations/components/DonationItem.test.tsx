// import "@testing-library/jest-dom";
// import "@testing-library/jest-dom/vitest";
import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "../../../utils/vitest-setup";
import DonationItem from "./DonationItem";

describe("DonationItem", () => {
	const defaultProps = {
		title: "Test Donation",
		subtitle: "This is a test donation description",
		onEdit: vi.fn(),
		onDelete: vi.fn(),
	};

	it("renders with title and subtitle", () => {
		render(<DonationItem {...defaultProps} />);

		expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
		expect(screen.getByText(defaultProps.subtitle)).toBeInTheDocument();
	});

	it("calls onEdit when edit button is clicked", () => {
		render(<DonationItem {...defaultProps} />);

		const editButton = screen.getByLabelText("edit");
		fireEvent.click(editButton);

		expect(defaultProps.onEdit).toHaveBeenCalledTimes(1);
	});

	it("calls onDelete when delete button is clicked", () => {
		render(<DonationItem {...defaultProps} />);

		const deleteButton = screen.getByLabelText("delete");
		fireEvent.click(deleteButton);

		expect(defaultProps.onDelete).toHaveBeenCalledTimes(1);
	});

	it("applies custom styles when provided", () => {
		const customStyles = { backgroundColor: "red" };
		const { container } = render(
			<DonationItem {...defaultProps} sx={customStyles} />,
		);

		const listItem = container.firstChild;
		expect(listItem).toHaveStyle("background-color: rgb(255, 0, 0)");
	});

	it("truncates long subtitle text with ellipsis", () => {
		const longSubtitle =
			"This is a very long subtitle text that should be truncated with ellipsis when rendered in the component because it exceeds the maximum width.";
		render(<DonationItem {...defaultProps} subtitle={longSubtitle} />);

		const truncatedSubtitle = screen.getByText(
			/This is a very long subtitle text that should be truncated with ellipsis when rendered in the component because it exceeds the maximum width./,
		);
		expect(truncatedSubtitle).toBeInTheDocument();
		expect(truncatedSubtitle).toHaveStyle("overflow: hidden");
		expect(truncatedSubtitle).toHaveStyle("text-overflow: ellipsis");
		expect(truncatedSubtitle).toHaveStyle("white-space: nowrap");
	});
});
