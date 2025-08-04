import type { DonationDT } from "../../../api/request/types";
import type { ColumnDefinition } from "../../../components/DataTable/types";

/**
 * Defines the columns for the Donation DataTable.
 * Each column is defined with an id, field, and title.
 * The field corresponds to the property in the DonationDT interface.
 */
const donationColumns: ColumnDefinition<Partial<DonationDT>>[] = [
	{ id: "title", field: "title", title: "Title" },
	{ id: "description", field: "description", title: "Description" },
];

export default donationColumns;
