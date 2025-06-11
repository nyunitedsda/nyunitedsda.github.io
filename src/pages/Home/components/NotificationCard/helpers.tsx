import dayjs from "dayjs";
import type { ReactNode } from "react";
import type {
	EventAnnouncement,
	ServiceEvent,
	StandardEvent,
	VirtualEvent,
} from "../../types";

import {
	AutoStoriesOutlined,
	CodeOutlined,
	EventOutlined,
	LocationOnOutlined,
	Person3Outlined,
	PhoneOutlined,
} from "@mui/icons-material";

type Section = {
	title: string;
	icon: ReactNode;
	content: ReactNode;
};

type NoteKeys = keyof Partial<VirtualEvent & ServiceEvent & StandardEvent>;

const WHEN = "When";
const WHERE = "Where";
const SERMON_TITLE = "Sermon Title";
const PHONE_NUMBER = "Phone #";
const CONFERENCE_CODE = "Conference Code";
const SPEAKER = "Speaker";

const NOTIFICATION_KEYS: NoteKeys[] = [
	"eventDate",
	"location",
	"speaker",
	"sermon",
	"phone",
	"conferenceCode",
];

const NOTIFICATION_ATTRIBUTES: Record<NoteKeys, Omit<Section, "content">> = {
	eventDate: { icon: <EventOutlined />, title: WHEN },
	location: { icon: <LocationOnOutlined />, title: WHERE },
	speaker: { icon: <Person3Outlined />, title: SPEAKER },
	sermon: { icon: <AutoStoriesOutlined />, title: SERMON_TITLE },
	phoneNumber: { icon: <PhoneOutlined />, title: PHONE_NUMBER },
	conferenceCode: { icon: <CodeOutlined />, title: CONFERENCE_CODE },
};

const createFormattedContent = (props: EventAnnouncement): Section[] => {
	const elements: Section[] = [];

	NOTIFICATION_KEYS.forEach((key) => {
		let section: Section | undefined;

		if (!!props[key as keyof EventAnnouncement]) {
			section = {
				...NOTIFICATION_ATTRIBUTES[key as NoteKeys],
				content: props?.[key as keyof EventAnnouncement] as ReactNode,
			};

			if (key === "eventDate") {
				const format = props?.recurring ? "dddd, h:mm a" : "MMM D, YYYY";
				section = {
					...section,
					content: dayjs(
						props?.[key as keyof EventAnnouncement] as string,
					).format(format) as ReactNode,
				};
			}
		}
		if(section) elements.push(section);
	});
	return elements;
};

export { createFormattedContent };
