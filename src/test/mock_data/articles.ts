import type { ArticleDT } from "../../api/request/databaseTypes";

const initialState: Partial<ArticleDT> = {
	title: "",
	author_id: 0,
	published_at: new Date(),
	views: 0,
	comments: 0,
	rating: undefined,
	category: "",
	img_src: "",
	content: "",
};

const articles: ArticleDT[] = [
	{
		id: 1,
		title: "The Power of Faith",
		author_id: 1,
		author: "John Doe",
		published_at: new Date("2025-07-10"),
		views: 120,
		comments: 5,
		rating: 4.8,
		category: "Inspiration",
		img_src: "/assets/img/faith.jpg",
		content: "Faith can move mountains. This article explores...",
	},
	{
		id: 2,
		title: "Community Service Highlights",
		author_id: 2,
		author: "Jane Smith",
		published_at: new Date("2025-06-20"),
		views: 85,
		comments: 2,
		rating: 4.5,
		category: "Community",
		img_src: "/assets/img/community.jpg",
		content: "Our church recently participated in...",
	},
	{
		id: 1,
		title: "Edification and Growth of Our Members and Visitors",
		author_id: 0,
		author: "SUPERUSER ACCOUNT",
		published_at: new Date("2024-03-15"),
		views: 5759,
		comments: 0,
		rating: 5.0,
		category: "UPDATES",
		content: `Thanks for visiting our website. It is our desire that our website will give you a window into our church family. Here we will share updates of events, live stream of our worship services, and other inspirational content.

	New York United church believes in the edification and growth of our members and visitors. We work to accomplish this through...

	Our church community is built on the foundation of love, fellowship, and spiritual growth. We believe that every person who walks through our doors is part of our extended family, and we are committed to providing a place where you can belong.

	Through our various ministries and programs, we strive to create opportunities for spiritual development, community service, and meaningful connections. Whether you're a long-time member or a first-time visitor, we welcome you with open arms and invite you to be part of our journey of faith.

	We understand that spiritual growth is a personal journey, and we're here to support you every step of the way. Our dedicated pastoral team and ministry leaders are committed to providing guidance, encouragement, and resources to help you deepen your relationship with God and connect with others in our church family.

	Join us as we continue to build a community where faith flourishes, relationships thrive, and lives are transformed through the love of Christ.`,
	},

	{
		id: 7,
		title: "Finding Peace in Troubled Times",
		author_id: 3,
		author: "Pastor John Smith",
		published_at: new Date("2023-05-15"),
		views: 0,
		comments: 0,
		rating: undefined,
		category: "General",
		img_src: "",
		content:
			"In today's fast-paced and often chaotic world, finding inner peace can seem like an impossible task...",
	},
	{
		id: 2,
		title: "The Power of Community Prayer",
		author_id: 4,
		author: "Elder Mary Johnson",
		published_at: new Date("2023-05-10"),
		views: 0,
		comments: 0,
		rating: undefined,
		category: "General",
		img_src: "",
		content:
			"When we come together as a community in prayer, something powerful happens. We create a collective...",
	},
	{
		id: 3,
		title: "Understanding Scripture in Modern Context",
		author_id: 5,
		author: "Deacon Robert Williams",
		published_at: new Date("2023-05-05"),
		views: 0,
		comments: 0,
		rating: undefined,
		category: "General",
		img_src: "",
		content:
			"How do we apply ancient wisdom to our modern lives? This is a question that many believers struggle with...",
	},
	{
		id: 4,
		title: "Youth Ministry: Engaging the Next Generation",
		author_id: 6,
		author: "Youth Pastor Sarah Davis",
		published_at: new Date("2023-04-28"),
		views: 0,
		comments: 0,
		rating: undefined,
		category: "General",
		img_src: "",
		content:
			"Our youth are not just the future of the church; they are the church of today. How we engage with them...",
	},
	{
		id: 5,
		title: "The Art of Forgiveness",
		author_id: 3,
		author: "Pastor John Smith",
		published_at: new Date("2023-04-20"),
		views: 0,
		comments: 0,
		rating: undefined,
		category: "General",
		img_src: "",
		content:
			"Forgiveness is at the heart of Christian teaching, but it's often one of the most difficult principles to practice...",
	},
	{
		id: 6,
		title: "Serving Others: The Path to Joy",
		author_id: 7,
		author: "Elder Thomas Brown",
		published_at: new Date("2023-04-15"),
		views: 0,
		comments: 0,
		rating: undefined,
		category: "General",
		img_src: "",
		content:
			"Service to others is not just a duty but a pathway to experiencing true joy and fulfillment in our lives...",
	},
];

const authorMetaInfo = ["author", "publishDate", "views", "comments", "rating"];
export { authorMetaInfo, initialState };
export default articles;
