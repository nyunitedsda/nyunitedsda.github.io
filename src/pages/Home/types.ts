import type { Dayjs } from "dayjs";
import type { EventType } from "@/api";

interface AnnouncementDetail {
	description?: string;
	id: number;
	title: string;
	type: EventType;
	event_date?: Dayjs;
	recurring: boolean;
	date_format: string;
}

// TODO: add a field for
interface ZoomEvent extends AnnouncementDetail {
	zoom_id: string;
	passcode: string;
	location: "Zoom";
	type: "zoom";
}
interface ConferenceEvent extends AnnouncementDetail {
	conference_code?: string;
	location?: string;
	phone_number: string;
	type: "conference";
}

interface ServiceEvent extends AnnouncementDetail {
	location?: string;
	sermon?: string;
	speaker: string;
	type: "service";
}

interface StandardEvent extends AnnouncementDetail {
	location: string;
	type: "event";
}

// Create a full announcement type
type EventAnnouncement =
	| ConferenceEvent
	| ServiceEvent
	| ZoomEvent
	| StandardEvent;

export type {
	AnnouncementDetail,
	ConferenceEvent,
	EventAnnouncement,
	ServiceEvent,
	StandardEvent,
	ZoomEvent,
};
