import {
	axiosInstance,
	type DatabaseEntity,
	handleOperationError,
} from "@api/index";
import type { AxiosRequestConfig } from "axios";

/**
 * Creates a new entity item in the database.
 * @param entity The entity type to create.
 * @param data The data for the new entity.
 * @param config Optional Axios request configuration.
 * @returns The created entity.
 */
const createEntity = async <T extends object>(
	entity: DatabaseEntity,
	data: Omit<T, "id">,
	config?: AxiosRequestConfig,
): Promise<T> => {
	try {
		const response = await axiosInstance.post(`/api/${entity}`, data, config);
		return response.data;
	} catch (error) {
		return Promise.reject(error);
	}
};

/**
 * Updates an existing entity item in the database.
 * @param entity The entity type to update.
 * @param id The ID of the entity to update.
 * @param data The updated data for the entity.
 * @param config Optional Axios request configuration.
 * @returns The updated entity.
 */
const updateEntity = async <T extends { id: number }>(
	entity: DatabaseEntity,
	id: number,
	data: Partial<Omit<T, "id">>,
	config?: AxiosRequestConfig,
): Promise<T> => {
	try {
		const response = await axiosInstance.put(
			`/api/${entity}/${id}`,
			data,
			config,
		);
		return response.data.data || response.data;
	} catch (error: unknown) {
		return Promise.reject(error);
	}
};

/**
 * Deletes an existing entity item from the database.
 * @param entity The entity type to delete.
 * @param id The ID of the entity to delete.
 * @param config Optional Axios request configuration.
 * @returns The result of the delete operation.
 */
const deleteEntity = async <T extends object>(
	entity: DatabaseEntity,
	id: number,
	config?: AxiosRequestConfig,
): Promise<T | { success: boolean }> => {
	try {
		const response = await axiosInstance.delete(`/api/${entity}/${id}`, config);
		return response.data.data || response.data;
	} catch (error: unknown) {
		return handleOperationError("delete", entity, error);
	}
};

export { createEntity, deleteEntity, updateEntity };
