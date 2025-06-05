import "@testing-library/jest-dom";
import ContactForm from "./ContactForm";
import { render, screen } from "../../utils/vitest-setup";

//TODO: Test ContactForm component

describe("ContactForm", () => {
	it("renders ContactForm", () => {
		render(<ContactForm />);

		expect(screen.getByText("Send Message")).toBeInTheDocument();
	});
});
