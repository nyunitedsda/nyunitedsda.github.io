import { vi } from "vitest";
import { render } from "../../utils/vitest-setup";
import { describe, expect, screen, it } from "../../utils/index.ts";
import Footer from "./Footer";

// Mock dependencies
vi.mock("../../hooks/routes/useFormattedRoutes", () => ({
	default: () => ({
		menuItems: [
			{ name: "Home", path: "/" },
			{ name: "About", path: "/about" },
		],
	}),
	__esModule: true,
}));

vi.mock("../../constants/services", () => ({
	default: [
		{ title: "Sabbath School", time: "9:30 AM" },
		{ title: "Divine Service", time: "11:00 AM" },
	],
}));

vi.mock("./footerData", async () => {
	const actual = await vi.importActual("./footerData");
	return {
		...actual,
		WEBSITE_TITLE: "Test Church",
		MOTTO: "A Place for Everyone",
		TERMS_AND_POLICIES: [
			{ content: "Privacy Policy", href: "/privacy" },
			{ content: "Terms of Service", href: "/terms" },
		],
		socialMediaInfo: [
			{ label: "Facebook", icon: "Facebook", href: "https://facebook.com" },
			{ label: "YouTube", icon: "YouTube", href: "https://youtube.com" },
		],
		QUICK_LINKS: "Quick Links",
		SERVICE_TIMES: "Service Times",
		CONTACT_US: "Contact Us",
		CONTACT_DATA: [
			{ icon: "Phone", content: "123-456-7890", attributes: {} },
			{ icon: "Email", content: "info@test.com", attributes: {} },
			{ content: "123 Main St, City" },
		],
		getCopyright: () => "2024 Test Church",
	};
});

describe("Footer", () => {
	it("renders the website title and motto", () => {
		render(<Footer />);
		expect(screen.getByText("Test Church")).toBeInTheDocument();
		expect(screen.getByText("A Place for Everyone")).toBeInTheDocument();
	});

	it("renders terms and policies links", () => {
		render(<Footer />);
		expect(screen.getByText("Privacy Policy")).toHaveAttribute(
			"href",
			"/privacy",
		);
		expect(screen.getByText("Terms of Service")).toHaveAttribute(
			"href",
			"/terms",
		);
	});

	it("renders social media icons with correct aria-labels and links", () => {
		render(<Footer />);
		expect(screen.getByLabelText("Facebook")).toHaveAttribute(
			"href",
			"https://facebook.com",
		);
		expect(screen.getByLabelText("YouTube")).toHaveAttribute(
			"href",
			"https://youtube.com",
		);
	});

	it("renders menu items", () => {
		render(<Footer />);
		expect(screen.getByText("Home")).toHaveAttribute("href", "/");
		expect(screen.getByText("About")).toHaveAttribute("href", "/about");
	});

	it("renders service times", () => {
		render(<Footer />);
		expect(screen.getByText(/Sabbath School:/)).toBeInTheDocument();
		expect(screen.getByText(/Divine Service:/)).toBeInTheDocument();
		expect(screen.getByText("9:30 AM")).toBeInTheDocument();
		expect(screen.getByText("11:00 AM")).toBeInTheDocument();
	});

	it("renders contact data with icons and text", () => {
		render(<Footer />);
		expect(screen.getByText("123-456-7890")).toBeInTheDocument();
		expect(screen.getByText("info@test.com")).toBeInTheDocument();
		expect(screen.getByText("123 Main St, City")).toBeInTheDocument();
	});

	it("renders copyright", () => {
		render(<Footer />);
		expect(screen.getByText(/©/)).toHaveTextContent("2024 Test Church");
	});
});
