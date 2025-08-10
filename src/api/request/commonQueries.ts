import type { AxiosRequestConfig } from "axios";
import axiosInstance from "../axiosInstance";
import { handleOperationError } from "./helpers";
import type { DatabaseEntity } from "./types";

/**
 * Authentication API calls
 */

/**
 * Get list of data for a specific entity
 * * @template T - Type of the entity
 * @param entity
 * @param config
 * @returns Promise<AxiosResponse<T[], any>>
 */
const getDatabaseList = async <T extends {[key: string]: unknown}>(
	entity: DatabaseEntity,
	config?: AxiosRequestConfig,
): Promise<T[]> => {
	try {
		const response = await axiosInstance.get(`/api/${entity}`, config);
		return response?.data || response;
	} catch (error: unknown) {
		return handleOperationError("getList", entity, error);
	}
};

/**
 * Get a single item by ID from a specific entity
 * * @template T - Type of the entity
 * @param entity
 * @param id
 * @param config
 * @returns Promise<AxiosResponse<T, any>>
 */
const getDatabaseItem = async <T extends { id: number }>(
	entity: DatabaseEntity,
	id: number,
	config?: AxiosRequestConfig,
): Promise<T> => {
	try {
		const response = await axiosInstance.get(`/api/${entity}/${id}`, config);
		return response?.data;
	} catch (error: unknown) {
		return handleOperationError("getItem", entity, error);
	}
};

export { getDatabaseItem, getDatabaseList };
