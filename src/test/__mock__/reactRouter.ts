import { vi } from "vitest";

// Mock react-router hooks globally to prevent context errors
vi.mock("react-router", async () => {
	const actual = await vi.importActual("react-router");
	return {
		...actual,
		useNavigate: () => vi.fn(),
		useLocation: () => ({
			pathname: "/test",
			search: "",
			hash: "",
			state: null,
			key: "default",
		}),
		useParams: () => ({}),
		useSearchParams: () => [new URLSearchParams(), vi.fn()],
	};
});
