import type { ServiceType } from "../../api/request/types";

export const initialService: ServiceType = {
	id: 0,
	time: "",
	title: "",
	created_at: "",
	modified_at: "",
};

const services: ServiceType[] = [
	{
		id: 1,
		time: "10:00 AM",
		title: "Sabbath School",
		created_at: "2025-07-01T09:00:00Z",
		modified_at: "2025-07-01T09:00:00Z",
	},
	{
		id: 2,
		time: "11:30 AM",
		title: "Divine Service",
		created_at: "2025-07-01T09:00:00Z",
		modified_at: "2025-07-01T09:00:00Z",
	},
];

export default services;
