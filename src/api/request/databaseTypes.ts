export type AnnouncementDTDate_format =
	| "YYYY-MM-DD"
	| "MM/DD/YYYY"
	| "DD-MM-YYYY"
	| "MMM D, YYYY"
	| "dddd, h:mm a";
export interface AnnouncementDT {
	id: number;
	title: string;
	author_id: number;
	date_format: AnnouncementDTDate_format;
	event_id?: number;
	description?: string;
	location?: string;
	conference_code?: string;
	zoom_id?: string;
	passcode?: string;
	phone_number?: string;
	sermon?: string;
	speaker?: string;
	recurring?: boolean;
	event_date?: Date;
}

export interface ArticleDT {
	id: number;
	title: string;
	author_id: number;
	published_at: Date;
	content: string;
	author: string;
	views?: number;
	comments?: number;
	rating?: number;
	category?: string;
	img_src?: string;
}

export interface ContactInfoDT {
	id: number;
	contact_name: string;
	email: string;
	phone: string;
	street: string;
	city: string;
	zip_code: string;
	country: string;
	is_default: boolean;
	mail_address?: string;
	mailing_recipient?: string;
}

export interface DonationDT {
	id: number;
	title: string;
	description: string;
}

export interface EventDT {
	id: number;
	name: string;
	author_id: number;
	description?: string;
}

export interface LegalContentDT {
	id: number;
	title: string;
	content: string;
	tag: string;
	author_id: number;
	created_at: Date;
	updated_at: Date;
	modifier_id?: number;
}

export interface MinistriesDT {
	id: number;
	title: string;
	content: string;
	link_url: string;
	image_url: string;
}

export interface NotificationDT {
	id: number;
	message: string;
	severity_id: number;
	title?: string;
	expires_at?: Date;
}

export interface PermissionDT {
	id: number;
	name: string;
	resource: string;
	action: string;
	created_at: Date;
	updated_at: Date;
	description?: string;
}

export interface RolePermitsDT {
	id: number;
	role_id: number;
	permission_id: number;
}

export interface RoleDT {
	id: number;
	name: string;
	is_active: boolean;
	created_at: Date;
	updated_at: Date;
	description?: string;
}

export interface ServiceDT {
	id: number;
	time: string;
	title: string;
}

export type SeverityDTColor =
	| "info"
	| "error"
	| "warning"
	| "success"
	| "primary"
	| "secondary";
export interface SeverityDT {
	id: number;
	type: string;
	title: string;
	color: SeverityDTColor;
}

export interface UserDT {
	id: number;
	username: string;
	password: string;
	role_id: number;
	is_active: boolean;
	remember_me: boolean;
	is_system: boolean;
	email?: string;
	first_name?: string;
	last_name?: string;
	last_login?: Date;
	permissions?: string[];
	role_name?: string;
}
