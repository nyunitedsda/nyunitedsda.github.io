import { HttpResponse, http } from "msw";

interface EntityHandlerParams<T> {
	url: string;
	data: T[];
	entity: string;
}

const createEntityHandler = <T extends { id?: number }>({
	url,
	data,
	entity,
}: EntityHandlerParams<T>) => {
	if (!url || !data || !entity) {
		throw new Error("URL, data, and entity must be provided");
	}

	const localData: T[] = [...data];

	return [
		// GET all items
		http.get(`${url}`, () => {
			return new HttpResponse({ status: 200, body: localData });
		}),
		// GET item by ID
		http.get(`${url}/:id`, (req) => {
			const { id } = req.params;
			const item = localData.find((u) => String(u.id) === String(id));
			if (!item) {
				return new HttpResponse({
					status: 404,
					body: { error: `${entity} not found` },
				});
			}
			return new HttpResponse({ status: 200, body: item });
		}),
		// POST create item
		http.post(`${url}`, async (req) => {
			const body = await req.request.json();
			if (typeof body !== "object" || body === null) {
				return new HttpResponse({
					status: 400,
					body: { error: "Invalid request body" },
				});
			}
			// Find max id
			const ids = localData.map((u) => (typeof u.id === "number" ? u.id : 0));
			const maxId = ids.length ? Math.max(...ids) : 0;
			const newItem = {
				...body,
				id: maxId + 1,
			} as T;
			localData.push(newItem);
			return new HttpResponse({ status: 201, body: newItem });
		}),
		// PUT update item
		http.put(`${url}/:id`, async (req) => {
			const { id } = req.params;
			const body = await req.request.json();
			const idx = localData.findIndex((u) => String(u.id) === String(id));
			if (idx === -1) {
				return new HttpResponse({
					status: 404,
					body: { error: `${entity} not found` },
				});
			}
			if (
				typeof localData[idx] === "object" &&
				localData[idx] !== null &&
				typeof body === "object" &&
				body !== null
			) {
				localData[idx] = { ...localData[idx], ...body };
			} else {
				return new HttpResponse({
					status: 400,
					body: { error: "Invalid data for update" },
				});
			}
			return new HttpResponse({ status: 200, body: localData[idx] });
		}),
		// DELETE item
		http.delete(`${url}/:id`, (req) => {
			const { id } = req.params;
			const idx = localData.findIndex((u) => String(u.id) === String(id));
			if (idx === -1) {
				return new HttpResponse({
					status: 404,
					body: { error: `${entity} not found` },
				});
			}
			localData.splice(idx, 1);
			return new HttpResponse({ status: 204 });
		}),
		// OPTIONS handlers
		http.options(`${url}`, () => {
			return new HttpResponse({ status: 204 });
		}),
		http.options(`${url}/:id`, () => {
			return new HttpResponse({ status: 204 });
		}),
	];
};

export { createEntityHandler };
