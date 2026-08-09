import { getMockEntity } from "@/test/mock_data/helpers";
import { axiosInstance, handleOperationError, type ContactInfoDT } from "@api/index";

const getDefaultContacts = async () => {
	try {
		const response = await getMockEntity('contact_info'); //await axiosInstance.get("/api/contact_info/default");
		return (response.data as ContactInfoDT[]).find((i) => i.is_default === true);
	} catch (error) {
		return handleOperationError("getDefaultContacts", "contact_info", error);
	}
};

const getActiveNotifications = async () => {
	try {
		const response = await getMockEntity('notifications'); // await axiosInstance.get("/api/notifications/active");
		return response.data;
	} catch (error) {
		return handleOperationError(
			"getActiveNotifications",
			"notifications",
			error,
		);
	}
};

export { getActiveNotifications, getDefaultContacts };
