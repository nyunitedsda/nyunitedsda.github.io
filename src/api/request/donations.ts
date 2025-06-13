import axios from "axios";
import type { Donations } from "./types";

const API_URL = import.meta.env.VITE_API_URL ?? "";

const getDonations = async (): Promise<Donations[]> => {
	try {
		const response = await axios.get(`${API_URL}/donations`);
		console.log("get-donations: ", response);

		return response.data;
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.error("getDonations query Error: ", error.message);
		} else {
			console.error("getDonations query Error: ", error);
		}
		return Promise.reject(error);
	}
};

export { getDonations };
