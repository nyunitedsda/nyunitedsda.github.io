import type { ServiceDT } from "../../../api/request";
import type { ColumnDefinition } from "../../../components/DataTable/types";

/**
 * Defines the columns for the Service DataTable.
 * Each column is defined with an id, field, and title.
 * The field corresponds to the property in the ServiceDT interface.
 */
const serviceColumns: ColumnDefinition<Partial<ServiceDT>>[] = [
	{ id: "title", field: "title", title: "Title" },
	{ id: "time", field: "time", title: "Time" },
];

export default serviceColumns;
