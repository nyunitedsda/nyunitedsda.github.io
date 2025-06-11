import type { Dayjs } from "dayjs";

export type AnnounceType = "event" | "service" | "virtual";

interface AnnouncementDetail {
	description?: string;
	id: number;
	title: string;
	type: AnnounceType;
	event_date?: Dayjs;
	recurring: boolean;
	date_format: string;
}

// TODO: add a field for

export interface VirtualEvent extends AnnouncementDetail {
	conference_code?: string;
	location?: string;
	phoneNumber: string;
	type: "virtual";
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
export type EventAnnouncement = VirtualEvent | ServiceEvent | StandardEvent;
