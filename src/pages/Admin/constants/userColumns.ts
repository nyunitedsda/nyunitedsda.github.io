import {
	CheckBoxOutlineBlankOutlined,
	CheckBoxOutlined,
} from "@mui/icons-material";
import { Checkbox, capitalize } from "@mui/material";
import dayjs from "dayjs";
import { createElement } from "react";
import type { UserDT } from "../../../api/request";
import type { ColumnDefinition } from "../../../components/DataTable/types";

type User = Partial<UserDT & { role_name: string }>;

/**
 * Defines the columns for the User DataTable.
 * Each column is defined with an id, field, and title.
 * The field corresponds to the property in the UserDT interface.
 */
const userColumns: ColumnDefinition<User>[] = [
	{ id: "username", field: "username", title: "Username" },
	{ id: "email", field: "email", title: "Email" },
	{ id: "first_name", field: "first_name", title: "First Name" },
	{ id: "last_name", field: "last_name", title: "Last Name" },
	{
		id: "role_name",
		field: "role_name",
		title: "User Role",
		renderCell: ({ role_name }) => capitalize(role_name ?? "") || "-",
	},
	{
		id: "is_active",
		field: "is_active",
		title: "Active",
		align: "center",
		renderCell: ({ is_active }) =>
			createElement(Checkbox, {
				checked: is_active,
				icon: createElement(CheckBoxOutlineBlankOutlined),
				checkedIcon: createElement(CheckBoxOutlined),
			}),
	},
	{
		id: "last_login",
		field: "last_login",
		title: "Last Login",
		align: "center",
		renderCell: ({ last_login }) =>
			last_login ? dayjs(last_login).format("YYYY-MM-DD HH:mm a") : "-",
	},
];

export default userColumns;
