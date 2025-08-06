import {
	announcements,
	articles,
	contactInfos,
	donations,
	notifications,
	roles,
	services,
} from "../../test/mock_data";
import { createEntityHandler } from "./genericHandlers";

const VITE_API_URL =
	(import.meta as unknown as ImportMeta).env.VITE_API_URL ||
	"http://localhost:3000";

const standardApiHandlers = [
	// Announcements handlers
	...createEntityHandler({
		url: `${VITE_API_URL}/announcements`,
		data: announcements,
		entity: "announcements",
	}),
	// Articles handlers
	...createEntityHandler({
		url: `${VITE_API_URL}/articles`,
		data: articles,
		entity: "articles",
	}),
	// Contact Info handlers
	...createEntityHandler({
		url: `${VITE_API_URL}/contact_info`,
		data: contactInfos,
		entity: "contact_info",
	}),
	// Donations handlers
	...createEntityHandler({
		url: `${VITE_API_URL}/donations`,
		data: donations,
		entity: "donations",
	}),
	// Notifications handlers
	...createEntityHandler({
		url: `${VITE_API_URL}/notifications`,
		data: notifications,
		entity: "notifications",
	}),
	// roles handlers
	...createEntityHandler({
		url: `${VITE_API_URL}/roles`,
		data: roles,
		entity: "roles",
	}),
	// Services handlers
	...createEntityHandler({
		url: `${VITE_API_URL}/services`,
		data: services,
		entity: "services",
	}),
];

export default standardApiHandlers;
