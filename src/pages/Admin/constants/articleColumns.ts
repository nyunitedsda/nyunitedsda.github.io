import type { ColumnDefinition } from "@components/DataTable";
import type { ArticleDT } from "@/api";

/**
 * Defines the columns for the Article DataTable.
 * Each column is defined with an id, field, and title.
 * The field corresponds to the property in the ArticleDT interface.
 */
const articleColumns: ColumnDefinition<Partial<ArticleDT>>[] = [
	{ id: "title", field: "title", title: "Title" },
	{ id: "author_id", field: "author_id", title: "Author" },
	{ id: "published_at", field: "published_at", title: "Publish Date" },
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
				? `${data.content.substring(0, 100)}...`
				: "No content";
		},
	},
];

export default articleColumns;
