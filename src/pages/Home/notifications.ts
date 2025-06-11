import dayjs from "dayjs";
import type { EventAnnouncement } from "./types";

export const notifications: EventAnnouncement[] = [
	{
		id: 1,
		type: "service",
		title: "Church Service",
		event_date: dayjs().day(6),
		speaker: "Pastor John Lomacang",
		sermon: "STAND",
		recurring: false,
		date_format: "MMM D, YYYY",
	},
	{
		id: 2,
		type: "event",
		title: "Wednesday Bible Study",
		event_date: dayjs().day(3).hour(18).minute(30),
		location: "Fellowship Hall & Via Zoom",
		recurring: true,
		date_format: "dddd, h:mm a",
	},
	{
		id: 4,
		type: "virtual",
		title: "Prayer Meeting",
		event_date: dayjs().day(2).hour(18).minute(30),
		location: "Via phone conference",
		phoneNumber: "971-224-6575",
		conference_code: "519018",
		recurring: true,
		date_format: "dddd, h:mm a",
	},
	{
		id: 3,
		type: "event",
		title: "TVCJA Soup and Salad Fundraiser",
		event_date: dayjs().day(3).hour(17).minute(45),
		location: "Fellowship Hall",
		recurring: true,
		date_format: "dddd, h:mm a",
		description:
			"The Thompsonville Christian Junior Academy is offering a soup and salad meal as a fundraiser every Wednesday before Wednesday Bible Study. Come out and support the school by having a meal before joining in Wednesday Bible Study.",
	},
];
