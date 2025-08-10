import type { ServiceDT } from "@/api";

export const initialState: Partial<ServiceDT> = {
	id: undefined,
	time: "",
	title: "",
};

const services: ServiceDT[] = [
	{
		id: 1,
		time: "10:00 AM",
		title: "Sabbath School",
	},
	{
		id: 2,
		time: "11:30 AM",
		title: "Divine Service",
	},
];

export default services;
