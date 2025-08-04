import dayjs from "dayjs";
import type { AnnouncementDT } from "../../../api/request/types";
import type { ColumnDefinition } from "../../../components/DataTable/types";

/**
 * Defines the columns for the Announcement DataTable.
 * Each column is defined with an id, field, and title.
 * The field corresponds to the property in the AnnouncementDT interface.
 */
const announcementColumns: ColumnDefinition<Partial<AnnouncementDT>>[] = [
	{ id: "title", field: "title", title: "Title" },
	{ id: "type", field: "type", title: "Type" },
	{ id: "description", field: "description", title: "Description" },
	{ id: "location", field: "location", title: "Location" },
	{ id: "conference_code", field: "conference_code", title: "Conference Code" },
	{ id: "phone_number", field: "phone_number", title: "Phone Number" },
	{ id: "sermon", field: "sermon", title: "Sermon" },
	{ id: "speaker", field: "speaker", title: "Speaker" },
	{ id: "recurring", field: "recurring", title: "Recurring" },
	{ id: "author_id", field: "author_id", title: "Author" },
	{
		id: "event_date",
		field: "event_date",
		title: "Event Date",
		renderCell: (row) =>
			dayjs(row.event_date).format(row.date_format || "MMMM D, YYYY h:mm A"),
	},
	{ id: "date_format", field: "date_format", title: "Date Format" },
	{ id: "zoom_id", field: "zoom_id", title: "Zoom ID" },
	{ id: "passcode", field: "passcode", title: "Passcode" },
];

export default announcementColumns;
