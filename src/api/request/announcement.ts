import { getDatabaseList } from "./commonQueries";
import type { Announcement } from "./types";

const getAnnouncements = async (): Promise<Announcement[]> => {
	const response = await getDatabaseList<Announcement>("announcements");
	console.log("Response: ", response);

	return response;
};

export { getAnnouncements };
