import { render, screen } from "../../utils/vitest-setup";
import Donations from "./Donations";

describe("Donations component", () => {
	beforeEach(() => {
		render(<Donations />);
	});

	it("renders the page title with correct header and subheader", () => {
		// PageTitle is a custom component, so we'll need to verify its props
		// This assumes PageTitle renders its title and subtitle as visible text
		expect(screen.getByText("Donations")).toBeInTheDocument();
		expect(screen.getByText("Ways to donate to New York United SDA Church")).toBeInTheDocument();
	});

	it("renders the donation text", () => {
		expect(
			screen.getByText("There are several ways one can give including safe, secure and convenient methods of giving online. Please see below:")
		).toBeInTheDocument();
	});

	it("renders all donation options", () => {
		// Check that each donation method is rendered
		expect(screen.getByText(/During Services:/)).toBeInTheDocument();
		expect(screen.getByText(/By Mail:/)).toBeInTheDocument();
		expect(screen.getByText(/Online Giving:/)).toBeInTheDocument();
	});

	it("renders donation descriptions with correct formatting", () => {
		// Check for parts of each description to verify they're rendered
		expect(screen.getByText(/Simply place cash or checks/)).toBeInTheDocument();
		expect(screen.getByText(/Please mail your donation/)).toBeInTheDocument();
		expect(screen.getByText(/Online giving allows for a safe/)).toBeInTheDocument();

		// Verify HTML is rendered correctly (checking for italic formatting)
		const mailOption = screen.getByText(/Please mail your donation/);
		expect(mailOption.innerHTML).toContain("<i>NY United Sabbath Day Adventist Church");
	});
});
