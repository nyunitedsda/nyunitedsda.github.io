import type { FC } from "react";
import type { ArticleType } from "../../../api/request/types";
import EntityManager from "../../../components/EntityManager";
import BlogEditor from "../../../forms/collection/BlogEditor/BlogEditor";
import DonationItem from "../../Donations/components/DonationItem";

const BLOG_SUBHEADER = "Manage blog articles";
const DELETE_ITEM_TITLE = "Delete Article";
const DELETE_CONFIRMATION_TEXT =
	"Are you sure you want to delete this article? This action cannot be undone.";
const EMPTY_ARTICLES_TEXT = "No articles available.";

// Wrapper component to handle type compatibility
const WrappedBlogEditor = ({
	open,
	data,
	onClose,
	onSuccess,
}: {
	open: boolean;
	data?: Partial<ArticleType>;
	onClose: () => void;
	onSuccess?: (data?: ArticleType) => void;
}) => (
	<BlogEditor
		open={open}
		data={data as ArticleType}
		onClose={onClose}
		onSuccess={onSuccess ? () => onSuccess() : undefined}
	/>
);

const BlogManagement: FC = () => {
	return (
		<EntityManager<ArticleType>
			entityName="articles"
			queryKey="admin-articles"
			title=""
			subtitle={BLOG_SUBHEADER}
			emptyText={EMPTY_ARTICLES_TEXT}
			deleteConfirmation={{
				title: DELETE_ITEM_TITLE,
				message: DELETE_CONFIRMATION_TEXT,
			}}
			ItemComponent={DonationItem}
			EditorComponent={WrappedBlogEditor}
			getItemTitle={(article: ArticleType) => article?.title as string}
			getItemSubtitle={(article: ArticleType) => article.category as string}
			createNewEntity={() => ({
				title: "",
				category: "",
				img_src: "",
				content: "",
				author_id: 1,
				publishDate: new Date().toISOString(),
			})}
			successMessages={{
				save: "Article saved successfully",
				delete: "Article deleted successfully",
			}}
		/>
	);
};

export default BlogManagement;
