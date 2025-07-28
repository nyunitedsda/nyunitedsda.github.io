export interface AnnouncementDT {
	id: number;
	title: string;
	type: "event" | "service" | "virtual";
	date_format: string;
	description?: string;
	location?: string;
	conference_code?: string;
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

export interface SeverityDT {
	id: number;
	type: string;
	title: string;
	color: "info" | "error" | "warning" | "success" | "primary" | "secondary";
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
}
