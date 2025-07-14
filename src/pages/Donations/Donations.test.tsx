import { beforeEach, describe, expect, it, screen } from "../../test/index.ts";
import { render } from "../../test/vitest-setup.tsx";
import Donations from "./Donations";

describe("Donations component", () => {
	beforeEach(() => {
		render(<Donations />);
	});

	it("renders the page title with correct header and subheader", () => {
		render(<Donations />);
		expect(screen.getByText("Donations")).toBeInTheDocument();
		expect(
			screen.getByText("Ways to donate to New York United SDA Church"),
		).toBeInTheDocument();
	});

	it("renders the donation text", () => {
		render(<Donations />);
		expect(
			screen.getByText(
				"There are several ways one can give including safe, secure and convenient methods of giving online. Please see below:",
			),
		).toBeInTheDocument();
	});

	it("renders all donation options", () => {
		render(<Donations />);

		screen.logTestingPlaygroundURL();
		expect(screen.getByText(/During Services:/)).toBeInTheDocument();
		expect(screen.getByText(/By Mail:/)).toBeInTheDocument();
		expect(screen.getByText(/Online Giving:/)).toBeInTheDocument();
	});

	it("renders donations descriptions with correct formatting", () => {
		render(<Donations />);
		
		expect(screen.getByText(/Simply place cash or checks/)).toBeInTheDocument();
		expect(screen.getByText(/Please mail your donation/)).toBeInTheDocument();
		expect(
			screen.getByText(/Online giving allows for a safe/),
		).toBeInTheDocument();

		// Verify HTML is rendered correctly (checking for italic formatting)
		const mailOption = screen.getByText(/Please mail your donation/);
		expect(mailOption.innerHTML).toContain(
			"<i>NY United Sabbath Day Adventist Church",
		);
	});
});
