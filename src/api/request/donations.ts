import { createEntity, deleteEntity, updateEntity } from "./commonMutations";
import { getDatabaseItem, getDatabaseList } from "./commonQueries";
import type { Donations } from "./types";

const getDonations = async (): Promise<Donations[]> => {
	return await getDatabaseList<Donations>("donations");
};

const getDonationsById = async (id: number): Promise<Donations> => {
	return await getDatabaseItem<Donations>("donations", id);
};

const createDonation = async (
	donation: Omit<Donations, "id">,
): Promise<Donations> => {
	return await createEntity<Donations>("donations", donation);
};

const updateDonation = async (
	id: number,
	donation: Partial<Omit<Donations, "id">>,
): Promise<Donations> => {
	return await updateEntity<Donations>("donations", id, donation);
};

const deleteDonation = async (id: number): Promise<void> => {
	return await deleteEntity("donations", id);
};

export {
	getDonations,
	createDonation,
	updateDonation,
	deleteDonation,
	getDonationsById,
};
