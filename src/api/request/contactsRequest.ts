import { axiosInstance, handleOperationError } from "@api/index";

const getDefaultContacts = async () => {
	try {
		const response = await axiosInstance.get("/api/contact_info/default");
		return response.data;
	} catch (error) {
		return handleOperationError("getDefaultContacts", "contact_info", error);
	}
};

const getActiveNotifications = async () => {
	try {
		const response = await axiosInstance.get('/api/notifications/active');
		return response.data;
	} catch (error) {
		return handleOperationError("getActiveNotifications", "notifications", error);
	}
}

export { getActiveNotifications, getDefaultContacts };
