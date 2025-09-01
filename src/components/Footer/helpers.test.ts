import { getCopyright } from "@components/Footer";
import { describe, expect, it, vi } from "vitest";

// Mock the footer constants
vi.mock("../../constants/footer", () => ({
	WEBSITE_TITLE: "New York United Sabbath Day Adventist Church",
}));

// Mock dayjs to return a consistent year for testing
vi.mock("dayjs", () => ({
	default: () => ({
		year: () => 2025,
	}),
}));

describe("Footer helpers", () => {
	describe("getCopyright", () => {
		it("should return the correct copyright string with current year and website title", () => {
			const result = getCopyright();

			expect(result).toBe(
				"2025 New York United Sabbath Day Adventist Church. All rights reserved",
			);
		});

		it("should include all required copyright elements", () => {
			const result = getCopyright();

			// Check that it contains the year
			expect(result).toContain("2025");

			// Check that it contains the website title
			expect(result).toContain("New York United Sabbath Day Adventist Church");

			// Check that it contains the copyright notice
			expect(result).toContain("All rights reserved");
		});

		it("should format the copyright string correctly", () => {
			const result = getCopyright();

			// Should start with the year
			expect(result).toMatch(/^\d{4}/);

			// Should end with "All rights reserved"
			expect(result).toMatch(/All rights reserved$/);

			// Should follow the pattern: YEAR TITLE. All rights reserved
			expect(result).toMatch(/^\d{4} .+\. All rights reserved$/);
		});
	});
});
