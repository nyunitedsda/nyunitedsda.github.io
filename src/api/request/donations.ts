import { getDatabaseList } from "./commonQueries";
import type { Donations } from "./types";

const getDonations = async (): Promise<Donations[]> => {
	return getDatabaseList<Donations>("donations");
};

// const deleteDonation = async() => {
// 	return get
// }
export { getDonations };
