import type { ArticleType } from "../../api/request/types";

export const initialArticle: Partial<ArticleType> = {
	title: "",
	author_id: 0,
	publishDate: new Date(),
	views: 0,
	comments: 0,
	rating: null,
	category: "",
	img_src: "",
	content: "",
	created_at: "",
	modified_at: "",
};

const articles: ArticleType[] = [
	{
		id: 1,
		title: "The Power of Faith",
		author_id: 1,
		publishDate: "2025-07-10",
		views: 120,
		comments: 5,
		rating: 4.8,
		category: "Inspiration",
		img_src: "/assets/img/faith.jpg",
		content: "Faith can move mountains. This article explores...",
		created_at: "2025-07-10T08:00:00Z",
		modified_at: "2025-07-10T08:00:00Z",
	},
	{
		id: 2,
		title: "Community Service Highlights",
		author_id: 2,
		publishDate: "2025-06-20",
		views: 85,
		comments: 2,
		rating: 4.5,
		category: "Community",
		img_src: "/assets/img/community.jpg",
		content: "Our church recently participated in...",
		created_at: "2025-06-20T08:00:00Z",
		modified_at: "2025-06-20T08:00:00Z",
	},
];

export default articles;
