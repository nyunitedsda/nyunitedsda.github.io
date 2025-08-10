import type {
	AnnouncementDT,
	ArticleDT,
	MinistriesDT,
} from "../../api/request";
import {
	getDatabaseItem,
	getDatabaseList,
} from "../../api/request/commonQueries";

export const homeLoader = async () => {
	let isLoading = true;
	const [announcements, ministries] = await Promise.all([
		getDatabaseList<AnnouncementDT>("announcements"),
		getDatabaseList<MinistriesDT>("ministries"),
	]);
	isLoading = false;
	return {
		announcements: announcements || [],
		ministries: ministries || [],
		isLoading,
	};
};

export const blogLoader = async () => {
	let isLoading = true;
	const blogs = await getDatabaseList<ArticleDT>("articles");
	isLoading = false;
	return { blogs: blogs || [], isLoading };
};

import type { LoaderFunctionArgs } from "react-router-dom";

export const blogDetailLoader = async ({ params }: LoaderFunctionArgs) => {
	let isLoading = true;
	const blog = await getDatabaseItem<ArticleDT>(
		"articles",
		params.id ? parseInt(params.id, 10) : 0,
	);
	isLoading = false;
	return { blog: blog || null, isLoading };
};
