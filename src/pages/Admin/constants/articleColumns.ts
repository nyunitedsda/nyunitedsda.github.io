import type { ArticleDT } from "../../../api/request";
import type { ColumnDefinition } from "../../../components/DataTable/types";

/**
 * Defines the columns for the Article DataTable.
 * Each column is defined with an id, field, and title.
 * The field corresponds to the property in the ArticleDT interface.
 */
const articleColumns: ColumnDefinition<Partial<ArticleDT>>[] = [
	{ id: "title", field: "title", title: "Title" },
	{ id: "author_id", field: "author_id", title: "Author" },
	{ id: "publishDate", field: "publishDate", title: "Publish Date" },
	{ id: "views", field: "views", title: "Views" },
	{ id: "comments", field: "comments", title: "Comments" },
	{ id: "rating", field: "rating", title: "Rating" },
	{ id: "category", field: "category", title: "Category" },
	// { id: "img_src", field: "img_src", title: "Image" },
	{
		id: "content",
		field: "content",
		title: "Content",
		renderCell: (data) => {
			return data.content
				? data.content.substring(0, 100) + "..."
				: "No content";
		},
	},
];

export default articleColumns;
