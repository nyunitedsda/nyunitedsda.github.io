import { createPath } from "./helpers";

// Export route constants for consistency
export default {
	HOME: createPath(""),
	DONATIONS: createPath("donations"),
	BLOG: createPath("blog"),
	CONTACT: createPath("contact"),
	ABOUT_US: createPath("aboutUs"),
	POLICY: createPath("policy"),
	WATCH: createPath("watch"),
	ADMIN: createPath("admin"),
	LOGIN: createPath("login"),
	UNAUTHORIZED: createPath("unauthorized"),
	NOT_FOUND: createPath("404"),
	STORYBOOK: createPath("storybook"),
	ADMIN_SETTINGS: createPath("admin/settings"),
	LEGAL_PRIVACY: createPath("policy/privacy"),
	LEGAL_TERMS: createPath("policy/termsOfUse"),
} as const;
