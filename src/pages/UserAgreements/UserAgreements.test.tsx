import { useLocation, useNavigate } from "react-router";
import { type Mock, vi } from "vitest";
import {
	beforeEach,
	describe,
	expect,
	fireEvent,
	it,
	render,
	screen,
	waitFor,
} from "../../test/index.ts";
import UserAgreements from "./UserAgreements";

const mockNavigate = vi.fn();
const mockLocation = vi.fn();
// Mock dependencies
vi.mock("react-router", async () => ({
	...(await vi.importActual<typeof import("react-router")>("react-router")),
	useLocation: () => mockLocation, // () => ({ pathname: "/terms" }),
	useNavigate: () => mockNavigate,
}));

vi.mock("../../components/PageWrapper/PageWrapper", () => ({
	default: ({ children }: { children: React.ReactNode }) => (
		<div>{children}</div>
	),
}));

vi.mock("../../components/TabPanel/TabPanel", () => ({
	default: ({ children, value, index }: any) =>
		value === index ? (
			<div data-testid={`tabpanel-${index}`}>{children}</div>
		) : null,
}));

describe.skip("UserAgreements", () => {
	beforeEach(() => {
		// (useLocation as Mock).mockReturnValue({ pathname: "/terms" })
	});

	// afterEach(() => {
	// 	vi.resetAllMocks()
	// })

	it("renders tabs for each agreement", () => {
		(mockLocation as Mock).mockReturnValue({
			pathname: "/termsOfUse",
			state: undefined,
			key: "",
			search: "",
			hash: "",
		});
		(useNavigate as Mock).mockReturnValue(vi.fn());

		render(<UserAgreements />);
		expect(screen.getByText("Terms of Service")).toBeInTheDocument();
		expect(screen.getByText("Privacy Policy")).toBeInTheDocument();
	});

	it("renders the correct tab panel content when a tab is selected", async () => {
		(useLocation as Mock).mockReturnValue({ pathname: "/termsOfUse" });
		// By default, the first tab should be selected due to pathname "/terms"
		render(<UserAgreements />);

		await waitFor(() => {
			expect(screen.getByTestId("tabpanel-0")).toHaveTextContent(
				"Terms Content",
			);
		});
	});

	it("changes tab and displays correct content on tab click", async () => {
		(useLocation as Mock).mockReturnValue({
			pathname: "/termsOfUse",
			state: undefined,
			key: "",
			search: "",
			hash: "",
		});

		render(<UserAgreements />);
		const privacyTab = screen.getByText("Privacy Policy");
		fireEvent.click(privacyTab);
		await waitFor(() => {
			expect(screen.getByTestId("tabpanel-1")).toHaveTextContent(
				"Privacy Content",
			);
		});
	});

	it("shows skeleton when no tab is selected", () => {
		// Override useLocation to simulate a path that doesn't match any tag
		(useLocation as Mock).mockReturnValue({
			pathname: "/non-matching",
			state: undefined,
			key: "",
			search: "",
			hash: "",
		});

		render(<UserAgreements />);
		expect(mockNavigate).toBeCalledWith("/error");
	});
});
