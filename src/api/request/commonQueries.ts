import type { AxiosRequestConfig } from "axios";
import axiosInstance from "../axiosInstance";
import type { DatabaseEntity } from "./types";

const getDatabaseList = async <T extends { id: number }>(
	entity: DatabaseEntity,
	config?: AxiosRequestConfig,
): Promise<T[]> => {
	try {
		const response = await axiosInstance.get(`/${entity}`, config);
		console.log(`get ${entity} list:`, response);
		return response?.data.data || response?.data;
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.error(`get${entity} query Error: ${error.message}`);
		} else {
			console.error(`get${entity} query Error:`, error);
		}
		return Promise.reject(error);
	}
};

const getDatabaseItem = async <T extends { id: number }>(
	entity: DatabaseEntity,
	id: number,
	config?: AxiosRequestConfig,
): Promise<T> => {
	try {
		const response = await axiosInstance.get(`/${entity}/${id}`, config);
		return response?.data.data || response?.data;
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.error(`get${entity} item Error: ${error.message}`);
		} else {
			console.error(`get${entity} item Error:`, error);
		}
		return Promise.reject(error);
	}
};

export { getDatabaseItem, getDatabaseList };
