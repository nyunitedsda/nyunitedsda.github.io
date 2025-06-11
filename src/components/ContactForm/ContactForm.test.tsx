import "@testing-library/jest-dom";
import { render, screen } from "../../utils/vitest-setup";
import ContactForm from "./ContactForm";

describe("ContactForm", () => {
	it("renders ContactForm", () => {
		render(<ContactForm />);

		expect(screen.getByText("Send Message")).toBeInTheDocument();
	});
});
