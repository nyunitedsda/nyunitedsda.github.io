import axios from "axios";
import type { DatabaseEntity } from "./types";

const API_URL = import.meta.env.VITE_API_URL ?? "";

// FEATURE: Update for page limit
const getDatabaseList = async <T extends { id: number }>(
	entity: DatabaseEntity,
): Promise<T[]> => {
	try {
		const response = await axios.get(`${API_URL}/${entity}`);

		return response?.data.data;
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.error(`get${entity}  query Error: ${error.message}`);
		} else {
			console.error(`get${entity}  query Error: ${error}`);
		}
		return Promise.reject(error);
	}
};

const getDatabaseItem = async <T extends { id: number }>(
  id: number,
	entity: DatabaseEntity,
): Promise<T> => {
	try {
		const response = await axios.get(`${API_URL}/${entity}/${id}`);

		return response.data;
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.error(`get${entity}  query Error: ${error.message}`);
		} else {
			console.error(`get${entity}  query Error: ${error}`);
		}
		return Promise.reject(error);
	}
};
export {getDatabaseItem, getDatabaseList };
