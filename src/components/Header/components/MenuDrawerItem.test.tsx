import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HomeIcon from "@mui/icons-material/Home";
import { vi } from "vitest";
import { fireEvent, render, screen } from "../../../utils/vitest-setup";
import MenuDrawerItem from "./MenuDrawerItem";

const mockOnClick = vi.fn();

const defaultProps = {
	text: "Home",
	icon: <HomeIcon data-testid="main-icon" />,
	isActive: false,
	onClick: mockOnClick,
};

describe("MenuDrawerItem", () => {
	it("renders with basic props correctly", () => {
		render(<MenuDrawerItem {...defaultProps} />);

		expect(screen.getByText("Home")).toBeInTheDocument();
		expect(screen.getByTestId("main-icon")).toBeInTheDocument();
	});

	it("applies active styling when isActive is true", () => {
		render(<MenuDrawerItem {...defaultProps} isActive={true} />);

		const button = screen.getByRole("button");
		expect(button).toHaveAttribute("aria-current", "page");
	});

	it("does not apply active styling when isActive is false", () => {
		render(<MenuDrawerItem {...defaultProps} />);

		const button = screen.getByRole("button");
		expect(button).not.toHaveAttribute("aria-current");
	});

	it("calls onClick handler when clicked", () => {
		const onClickMock = vi.fn();
		render(<MenuDrawerItem {...defaultProps} onClick={onClickMock} />);

		fireEvent.click(screen.getByRole("button"));
		expect(onClickMock).toHaveBeenCalledTimes(1);
	});

	it("does not call onClick when disabled", () => {
		render(<MenuDrawerItem {...defaultProps} disabled={true} />);

		expect(screen.getByRole("button")).toHaveClass("Mui-disabled");
		expect(screen.getByRole("button").ariaDisabled).toEqual("true");
		fireEvent.click(screen.getByRole("button"));
		expect(mockOnClick).not.toHaveBeenCalled();
	});

	it("renders expandedIcon when provided", () => {
		render(
			<MenuDrawerItem
				{...defaultProps}
				expandedIcon={<ExpandMoreIcon data-testid="expanded-icon" />}
			/>,
		);

		expect(screen.getByTestId("expanded-icon")).toBeInTheDocument();
	});

	it("does not render expandedIcon when not provided", () => {
		render(<MenuDrawerItem {...defaultProps} />);

		expect(screen.queryByTestId("expanded-icon")).not.toBeInTheDocument();
	});
});
