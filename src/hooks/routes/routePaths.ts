import { createPath } from "@hooks/routes";

const routePaths: Record<string, string> = {
	// WATCH_YOUTUBE_ARCHIVE: createPath("watch/youtube-archive"),
	ABOUT_US: createPath("aboutUs"),
	ADMIN_ANNOUNCEMENTS: createPath("admin/announcements"),
	ADMIN_ARTICLES: createPath("admin/articles"),
	ADMIN_CONTACT_INFO: createPath("admin/contact_info"),
	ADMIN_DONATIONS: createPath("admin/donations"),
	ADMIN_LEGAL_CONTENT: createPath("admin/legal_content"),
	ADMIN_MINISTRIES: createPath("admin/ministries"),
	ADMIN_NOTIFICATIONS: createPath("admin/notifications"),
	ADMIN_SERVICES: createPath("admin/services"),
	ADMIN_USERS: createPath("admin/users"),
	ADMIN_SETTINGS: createPath("admin/settings"),
	ADMIN: createPath("admin/:tab?"),
	BLOG: createPath("blog"),
	CONTACT: createPath("contact"),
	DONATIONS: createPath("donations"),
	HOME: createPath(""),
	LEGAL_PRIVACY: createPath("policy/privacy"),
	LEGAL_TERMS: createPath("policy/termsOfUse"),
	LOGIN: createPath("login"),
	NOT_FOUND: createPath("404"),
	POLICY: createPath("policy"),
	LIBRARY: createPath("library"),
	UNAUTHORIZED: createPath("unauthorized"),
	WATCH_ARCHIVE: createPath("watch/archive"),
	WATCH_LIVE: createPath("watch/live"),
	WATCH: createPath("watch/:tab?"),
};

export { routePaths };
