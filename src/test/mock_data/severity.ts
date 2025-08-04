import type { SeverityDT } from "../../api/request/databaseTypes";

const severities: SeverityDT[] = [
	{
		id: 1,
		type: "Info",
		title: "Information",
		color: "info",
	},
	{
		id: 2,
		type: "Error",
		title: "Error",
		color: "error",
	},
	{
		id: 3,
		type: "Warning",
		title: "Warning",
		color: "warning",
	},
	{
		id: 4,
		type: "Success",
		title: "Success",
		color: "success",
	},
	{
		id: 5,
		type: "Primary",
		title: "Primary",
		color: "primary",
	},
	{
		id: 6,
		type: "Secondary",
		title: "Secondary",
		color: "secondary",
	},
];

export default severities;
