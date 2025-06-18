import type { AxiosRequestConfig, AxiosResponse } from "axios";
import axiosInstance from "../axiosInstance";
import type { DatabaseEntity } from "./types";

// FEATURE: Update for page limit
const getDatabaseList = async <T extends { id: number }>(
	entity: DatabaseEntity,
	config?: AxiosRequestConfig<T>,
): Promise<T[]> => {
	try {
		const response = await axiosInstance.get(`/${entity}`, config);

		console.log("get data list: ", response);

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
	entity: DatabaseEntity,
	params: T,
	data?: T,
	config?: AxiosRequestConfig<T>,
): Promise<AxiosResponse<T>> => {
	try {
		return await axiosInstance.get(`/${entity}`, {
			params,
			data,
			...config,
		});
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.error(`get${entity}  query Error: ${error.message}`);
		} else {
			console.error(`get${entity}  query Error: ${error}`);
		}
		return Promise.reject(error);
	}
};
export { getDatabaseItem, getDatabaseList };
