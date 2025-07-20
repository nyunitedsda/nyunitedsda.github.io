import { useQuery } from "@tanstack/react-query";
import { type FC, useCallback, useEffect, useState } from "react";
import { getDatabaseList } from "../../../api/request/commonQueries";
import { deleteEntity } from "../../../api/request/mutations";
import type { ArticleType } from "../../../api/request/types";
import DataTable from "../../../components/DataTable/DataTable";
import PageTitle from "../../../components/PageWrapper/PageTitle";
import BlogEditor from "../../../forms/collection/BlogEditor/BlogEditor";
import useToken from "../../../hooks/auth/useToken";
import { initialArticle } from "../../../test/mock_data/articles";
import { createAuthConfig } from "../../../utils/authUtils";
import articleColumns from "../constants/articleColumns";

const BLOG_SUBHEADER = "Manage blog articles";

const BlogManagement: FC = () => {
	const { accessToken } = useToken();
	const [articleData, setArticleData] = useState<Partial<ArticleType>[]>([]);
	const [createArticleOpen, setCreateArticleOpen] =
		useState<Partial<ArticleType> | null>(null);

	const { data: queryData, refetch } = useQuery<
		{ data: ArticleType[] } | undefined
	>({
		queryKey: ["articles"],
		queryFn: () => getDatabaseList("articles", createAuthConfig(accessToken)),
		staleTime: 5 * 60 * 1000,
		refetchOnWindowFocus: false,
	});

	useEffect(() => {
		if (queryData && Array.isArray(queryData.data)) {
			setArticleData(queryData.data);
		}
	}, [queryData]);

	const _handleDeleteArticle = useCallback(
		(id: number) => {
			deleteEntity("articles", id, createAuthConfig(accessToken))
				.then(() => {
					setArticleData((prev) =>
						prev.filter((article) => article?.id !== id),
					);
				})
				.catch((error) => {
					console.error("Failed to delete article:", error);
				});
		},
		[accessToken],
	);

	return (
		<>
			<PageTitle
				title=""
				subtitle={BLOG_SUBHEADER}
				handleClick={() => setCreateArticleOpen(initialArticle)}
			/>

			<DataTable
				data={articleData.map((article) => ({
					...article,
					publishDate:
						typeof article.publishDate === "string"
							? article.publishDate
							: article.publishDate instanceof Date
								? article.publishDate.toLocaleDateString()
								: "",
				}))}
				columns={articleColumns}
				onEdit={(d) => setCreateArticleOpen(d)}
				onDelete={(d) => _handleDeleteArticle(d?.id as number)}
				onView={(d) => setCreateArticleOpen(d)}
			/>

			{createArticleOpen && (
				<BlogEditor
					open={!!createArticleOpen}
					data={createArticleOpen as ArticleType}
					onClose={() => setCreateArticleOpen(null)}
					onSuccess={() => {
						refetch();
						setCreateArticleOpen(null);
					}}
				/>
			)}
		</>
	);
};

export default BlogManagement;
