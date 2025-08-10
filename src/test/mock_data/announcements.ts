import type { AnnouncementDT } from "../../api/request";

export const dateFormatValues = [
	"YYYY-MM-DD",
	"MM/DD/YYYY",
	"DD-MM-YYYY",
	"MMM D, YYYY",
	"dddd, h:mm a",
] as const;

export const announcementDateFormats = dateFormatValues.map((format) => ({
	format,
	value: format,
}));

export const initialState: AnnouncementDT = {
	id: 0,
	title: "",
	event_id: 1,
	description: "",
	location: "",
	conference_code: "",
	phone_number: "",
	sermon: "",
	speaker: "",
	recurring: false,
	event_date: undefined,
	date_format: "MM/DD/YYYY",
	zoom_id: "",
	passcode: "",
	author_id: 1,
};

const announcements: AnnouncementDT[] = [
	{
		id: 1,
		title: "Sabbath Worship Service",
		event_id: 2,
		description: "Join us for our weekly Sabbath worship.",
		location: "Main Sanctuary",
		event_date: new Date("2025-07-19T10:00:00Z"),
		date_format: "MM/DD/YYYY",
		speaker: "Pastor John Doe",
		sermon: "Faith and Hope",
		recurring: true,
		author_id: 1,
	},
	{
		id: 2,
		title: "Youth Conference 2025",
		event_id: 3,
		description: "Annual youth conference with guest speakers.",
		location: "Community Hall",
		event_date: new Date("2025-08-10T09:00:00Z"),
		date_format: "MM/DD/YYYY",
		conference_code: "YTH2025",
		author_id: 1,
	},
];

export default announcements;
