import { vi } from "vitest";

// Mock DOM methods and objects that cause issues in tests
Object.defineProperty(window, "scrollTo", {
	value: vi.fn(),
	writable: true,
});

Object.defineProperty(window, "getComputedStyle", {
	value: vi.fn(() => ({
		scrollTop: "0",
		scrollLeft: "0",
		getPropertyValue: vi.fn(),
	})),
	writable: true,
});

// Mock HTMLElement methods
Object.defineProperty(HTMLElement.prototype, "scrollTo", {
	value: vi.fn(),
	writable: true,
});

Object.defineProperty(HTMLElement.prototype, "scrollTop", {
	value: 0,
	writable: true,
});

Object.defineProperty(HTMLElement.prototype, "scrollLeft", {
	value: 0,
	writable: true,
});
