import type { HttpHandler } from "msw";
import { setupWorker } from "msw/browser";
import userHandlers from "./authHandlers";
import standardApiHandlers from "./standardResourceHandlers";

const globalApiHandlers: HttpHandler[] = [
	...userHandlers,
	...standardApiHandlers,
];

const worker = setupWorker(...globalApiHandlers);

worker.use(...globalApiHandlers);

worker.start({
	onUnhandledRequest: (req) => {
		// Only handle requests with '/api/' in the URL
		// console.log(`[MSW] Intercepted Request: ${req.method} ${req.url}`);
		// console.log(`[MSW] Intercepted Request Url Test:  ${req.url.includes('/api/')}`);
		if (req.url.includes("/api/")) {
			console.log(`[MSW] Intercepted Request: ${req.method} ${req.url}`);
			console.warn(`[MSW] Unhandled API request: => ${req.method} ${req.url}`);
		}
		// Ignore all other requests (including assets)
	},
});

worker.listHandlers();
worker.events.on("request:unhandled", ({ request }) => {
	console.info(`[MSW] Unhandled Request: ${request.method} ${request.url}`);
});

export default globalApiHandlers;
