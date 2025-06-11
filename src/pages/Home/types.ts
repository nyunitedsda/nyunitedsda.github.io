import type { Dayjs } from "dayjs";

export type AnnounceType = "event" | "service" | "virtual";

interface AnnouncementDetail {
	description?: string;
	id: number;
	title: string;
	type: AnnounceType;
	eventDate?: Dayjs;
  recurring: boolean;
}

// TODO: add a field for 

export interface VirtualEvent extends AnnouncementDetail {
	conferenceCode?: string;
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
