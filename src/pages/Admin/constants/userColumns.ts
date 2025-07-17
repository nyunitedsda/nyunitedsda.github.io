import { Checkbox } from "@mui/material";
import { createElement } from "react";
import type { UserType } from "../../../api/request/types";
import type { ColumnDefinition } from "../../../components/DataTable/types";

/**
 * Defines the columns for the User DataTable.
 * Each column is defined with an id, field, and title.
 * The field corresponds to the property in the UserType interface.
 */
const userColumns: ColumnDefinition<Partial<UserType>>[] = [
	{ id: "username", field: "username", title: "Username" },
	{ id: "email", field: "email", title: "Email" },
	{ id: "firstName", field: "firstName", title: "First Name" },
	{ id: "lastName", field: "lastName", title: "Last Name" },
	{ id: "role", field: "role", title: "Role" },
	{
		id: "is_active",
		field: "is_active",
		title: "Active",
		renderCell: ({ is_active }) =>
			createElement(Checkbox, { checked: is_active }),
	},
];

export default userColumns;
