import axiosInstance from "../axiosInstance";
import { handleOperationError } from "./helpers";

const getDefaultContacts = async () => {
	try {
		const response = await axiosInstance.get("/api/contact_info/default");
		return response.data;
	} catch (error) {
		return handleOperationError("getDefaultContacts", "contact_info", error);
	}
};

export { getDefaultContacts };
