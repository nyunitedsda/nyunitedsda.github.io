import type { Dayjs } from "dayjs";
import type { EventType } from "../../api/request";

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
export interface ZoomEvent extends AnnouncementDetail {
	zoom_id: string;
	passcode: string;
	location: "Zoom";
	type: "zoom";
}
export interface ConferenceEvent extends AnnouncementDetail {
	conference_code?: string;
	location?: string;
	phone_number: string;
	type: "conference";
}

export interface ServiceEvent extends AnnouncementDetail {
	location?: string;
	sermon?: string;
	speaker: string;
	type: "service";
}

export interface StandardEvent extends AnnouncementDetail {
	location: string;
	type: "event";
}

// Create a full announcement type
export type EventAnnouncement =
	| ConferenceEvent
	| ServiceEvent
	| ZoomEvent
	| StandardEvent;
