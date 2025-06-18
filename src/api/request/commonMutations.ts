import type { AxiosRequestConfig } from "axios";
import axiosInstance from "../axiosInstance";
import type { DatabaseEntity } from "./types";

// Create entity
const createEntity = async <T extends object>(
	entity: DatabaseEntity,
	data: Omit<T, "id">,
	config?: AxiosRequestConfig,
): Promise<T> => {
	try {
		const response = await axiosInstance.post(`/${entity}`, data, config);
		return response.data.data || response.data;
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.error(`create${entity} mutation Error: ${error.message}`);
		} else {
			console.error(`create${entity} mutation Error:`, error);
		}
		return Promise.reject(error);
	}
};

// Update entity
const updateEntity = async <T extends { id: number }>(
	entity: DatabaseEntity,
	id: number,
	data: Partial<Omit<T, "id">>,
	config?: AxiosRequestConfig,
): Promise<T> => {
	try {
		const response = await axiosInstance.put(`/${entity}/${id}`, data, config);
		return response.data.data || response.data;
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.error(`update${entity} mutation Error: ${error.message}`);
		} else {
			console.error(`update${entity} mutation Error:`, error);
		}
		return Promise.reject(error);
	}
};

// Delete entity
const deleteEntity = async (
	entity: DatabaseEntity,
	id: number,
	config?: AxiosRequestConfig,
): Promise<void> => {
	try {
		await axiosInstance.delete(`/${entity}/${id}`, config);
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.error(`delete${entity} mutation Error: ${error.message}`);
		} else {
			console.error(`delete${entity} mutation Error:`, error);
		}
		return Promise.reject(error);
	}
};

export { createEntity, updateEntity, deleteEntity };
