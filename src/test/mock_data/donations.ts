import type { DonationType } from "../../api/request/types";

export const initialDonation: Partial<DonationType> = {
	title: "",
	description: "",
};

const donations: DonationType[] = [
	{
		id: 1,
		title: "Tithe",
		description: "Support the church with your tithe.",
	},
	{
		id: 2,
		title: "Offering",
		description: "General offering for church needs.",
	},
];

export default donations;
