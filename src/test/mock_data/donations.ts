import type { DonationDT } from "@/api";

export const initialState: Partial<DonationDT> = {
	title: "",
	description: "",
};

const donations: DonationDT[] = [
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
