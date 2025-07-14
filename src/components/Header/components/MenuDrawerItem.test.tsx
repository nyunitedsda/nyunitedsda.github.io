import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HomeIcon from "@mui/icons-material/Home";
import { vi } from "vitest";
import {
    describe,
    expect,
    fireEvent,
    it,
    screen,
} from "../../../test/index.ts";
import { render } from "../../../test/vitest-setup.tsx";
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

		const button = screen.getByRole("menuitem");
		expect(button).toHaveAttribute("aria-current", "page");
	});

	it("does not apply active styling when isActive is false", () => {
		render(<MenuDrawerItem {...defaultProps} />);

		const button = screen.getByRole("menuitem");
		expect(button).not.toHaveAttribute("aria-current");
	});

	it("calls onClick handler when clicked", () => {
		const onClickMock = vi.fn();
		render(<MenuDrawerItem {...defaultProps} onClick={onClickMock} />);

		fireEvent.click(screen.getByRole("menuitem"));
		expect(onClickMock).toHaveBeenCalledTimes(1);
	});

	it("does not call onClick when disabled", () => {
		render(<MenuDrawerItem {...defaultProps} disabled={true} />);

		expect(screen.getByRole("menuitem")).toHaveClass("Mui-disabled");
		expect(screen.getByRole("menuitem").ariaDisabled).toEqual("true");
		fireEvent.click(screen.getByRole("menuitem"));
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
