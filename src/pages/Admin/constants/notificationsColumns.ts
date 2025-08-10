import type { ColumnDefinition } from "@components/DataTable";
import type { NotificationDT } from "@/api";

/**
 * Defines the columns for the Notification DataTable.
 * Each column is defined with an id, field, and title.
 * The field corresponds to the property in the NotificationDT interface.
 */
const notificationsColumns: ColumnDefinition<Partial<NotificationDT>>[] = [
	{ id: "title", field: "title", title: "Title" },
	{ id: "message", field: "message", title: "Message" },
	{ id: "severity_id", field: "severity_id", title: "Severity" },
	{
		id: "expires_at",
		field: "expires_at",
		title: "Expiration Date",
		renderCell: (data) => {
			return data.expires_at
				? new Date(data.expires_at).toLocaleString()
				: "No expiration";
		},
	},
];

export default notificationsColumns;
