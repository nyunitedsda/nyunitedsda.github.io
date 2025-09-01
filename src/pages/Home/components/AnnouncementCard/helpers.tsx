import type { AnnouncementDT } from "@/api";
import dayjs from "dayjs";
import { createElement, lazy, type ReactNode } from "react";

type Section = {
	title: string;
	icon: ReactNode;
	content: ReactNode;
};

type NoteKeys =
	| "event_date"
	| "location"
	| "speaker"
	| "sermon"
	| "phone_number"
	| "conference_code";

const WHEN = "When";
const WHERE = "Where";
const SERMON_TITLE = "Sermon Title";
const PHONE_NUMBER = "Phone #";
const CONFERENCE_CODE = "Conference Code";
const SPEAKER = "Speaker";

const NOTIFICATION_KEYS: NoteKeys[] = [
	"event_date",
	"location",
	"speaker",
	"sermon",
	"phone_number",
	"conference_code",
];

const AutoStoriesOutlined = lazy(
	() => import("@mui/icons-material/AutoStoriesOutlined"),
);
const CodeOutlined = lazy(() => import("@mui/icons-material/CodeOutlined"));
const EventOutlined = lazy(() => import("@mui/icons-material/EventOutlined"));
const LocationOnOutlined = lazy(
	() => import("@mui/icons-material/LocationOnOutlined"),
);
const Person3Outlined = lazy(
	() => import("@mui/icons-material/Person3Outlined"),
);
const PhoneOutlined = lazy(() => import("@mui/icons-material/PhoneOutlined"));

const NOTIFICATION_ATTRIBUTES: Record<NoteKeys, Omit<Section, "content">> = {
	event_date: { icon: createElement(EventOutlined), title: WHEN },
	location: { icon: createElement(LocationOnOutlined), title: WHERE },
	speaker: { icon: createElement(Person3Outlined), title: SPEAKER },
	sermon: { icon: createElement(AutoStoriesOutlined), title: SERMON_TITLE },
	phone_number: { icon: createElement(PhoneOutlined), title: PHONE_NUMBER },
	conference_code: {
		icon: createElement(CodeOutlined),
		title: CONFERENCE_CODE,
	},
};

const createFormattedContent = (props: AnnouncementDT): Section[] => {
	const elements: Section[] = [];

	NOTIFICATION_KEYS.forEach((key) => {
		let section: Section | undefined;

		if (props[key as keyof AnnouncementDT]) {
			section = {
				...NOTIFICATION_ATTRIBUTES[key as NoteKeys],
				content: props?.[key as keyof AnnouncementDT] as ReactNode,
			};

			if (key === "event_date") {
				section = {
					...section,
					content: dayjs(props?.[key as keyof AnnouncementDT] as string).format(
						props?.date_format,
					) as ReactNode,
				};
			}
		}
		if (section) elements.push(section);
	});
	return elements;
};

export { createFormattedContent };
