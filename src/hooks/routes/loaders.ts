import { useAuthentication, useCurrentUser } from "@hooks/auth";
import type { LoaderFunctionArgs } from "react-router-dom";
import {
	type ArticleDT,
	getDatabaseItem,
	getDatabaseList,
	getDefaultContacts,
	type UserDT,
} from "@/api";

export const adminLoader = async () => {
	const { user } = useAuthentication();
	const { refetch } = useCurrentUser();
	let adminUser = user;
	if (!adminUser) {
		adminUser = (await refetch()).data as UserDT;
	}
	return { adminUser: adminUser };
};

export const blogDetailLoader = async ({ params }: LoaderFunctionArgs) => {
	let isLoading = true;
	const blog = await getDatabaseItem<ArticleDT>(
		"articles",
		params.id ? parseInt(params.id, 10) : 0,
	);
	isLoading = false;
	return { blog: blog || null, isLoading };
};

export const blogLoader = async () => {
	let isLoading = true;
	const blogs = await getDatabaseList("articles");
	isLoading = false;
	return { blogs: blogs || [], isLoading };
};

export const homeLoader = async () => {
	let isLoading = true;
	const [announcements, ministries] = await Promise.all([
		getDatabaseList("announcements"),
		getDatabaseList("ministries"),
	]);
	isLoading = false;
	return {
		announcements: announcements || [],
		ministries: ministries || [],
		isLoading,
	};
};

export const pageLoader = async () => {
	let isLoading = true;
	const [services, defaultContact] = await Promise.all([
		getDatabaseList("services"),
		getDefaultContacts(),
	]);
	isLoading = false;
	return {
		services: services || [],
		defaultContact: defaultContact || {},
		isLoading,
	};
};
