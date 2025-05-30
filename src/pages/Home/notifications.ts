import dayjs from "dayjs";

export interface ChurchNotificationProps {
	id: number;
	type: "event" | "service" | "announcement";
	title: string;
	date?: string;
	time?: string;
	location?: string;
	description?: string;
	phoneNumber?: string;
	conferenceCode?: string;
	speaker?: string;
	sermonTitle?: string;
	addToCalendarLink?: string;
}

export const notifications: ChurchNotificationProps[] = [
	{
		id: 1,
		type: "service",
		title: "Church Service",
		date: dayjs().day(6).format("MMM DD, YYYY"),
		speaker: "Pastor John Lomacang",
		sermonTitle: "STAND",
	},
	{
		id: 2,
		type: "event",
		title: "Wednesday Bible Study",
		time: dayjs().day(3).hour(18).minute(30).format("dddd, h:mm a"),
		location: "Fellowship Hall & Via Zoom",
	},
	{
		id: 4,
		type: "event",
		title: "Prayer Meeting",
		time: dayjs().day(2).hour(18).minute(30).format("dddd, h:mm a"),
		location: "Via phone conference",
		phoneNumber: "971-224-6575",
		conferenceCode: "519018",
	},
	{
		id: 3,
		type: "event",
		title: "TVCJA Soup and Salad Fundraiser",
		time: dayjs().day(3).hour(17).minute(45).format("dddd, h:mm a"),
		location: "Fellowship Hall",
		description:
			"The Thompsonville Christian Junior Academy is offering a soup and salad meal as a fundraiser every Wednesday before Wednesday Bible Study. Come out and support the school by having a meal before joining in Wednesday Bible Study.",
	},
];
