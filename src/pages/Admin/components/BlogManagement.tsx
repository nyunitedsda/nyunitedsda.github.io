import { useQuery } from "@tanstack/react-query";
import { type FC, useCallback, useState } from "react";
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
import type { GenericType } from "../../../components/DataTable/types";
import { useSnackbar } from "notistack";
import usePermission from "../../../hooks/auth/usePermission";

const BLOG_SUBHEADER = "Manage blog articles";

const BlogManagement: FC = () => {
	const { accessToken } = useToken();
	const { enqueueSnackbar } = useSnackbar();
	const { canCreate, canEdit, canDelete } = usePermission("articles");

	const [createArticleOpen, setCreateArticleOpen] =
		useState<Partial<ArticleType> | null>(null);

	const { data: queryData, refetch } = useQuery<ArticleType[] | undefined>({
		queryKey: ["articles"],
		queryFn: () => getDatabaseList("articles", createAuthConfig(accessToken)),
		staleTime: 5 * 60 * 1000,
		refetchOnWindowFocus: false,
	});

	const _handleDeleteArticle = useCallback(
		(data: GenericType & { id: number }) => {
			const { id } = data as GenericType & { id: number };
			deleteEntity("articles", id, createAuthConfig(accessToken))
				.then(() => {
					refetch();
					enqueueSnackbar("Article deleted successfully", {
						variant: "success",
					});
				})
				.catch((error) => {
					console.error("Failed to delete article:", error);
					enqueueSnackbar("Failed to delete article", {
						variant: "error",
					});
				});
		},
		[accessToken],
	);

	return (
		<>
			<PageTitle
				title=""
				subtitle={BLOG_SUBHEADER}
				handleClick={
					canCreate ? () => setCreateArticleOpen(initialArticle) : undefined
				}
			/>

			<DataTable
				data={queryData as unknown as GenericType[]}
				columns={articleColumns}
				onEdit={canEdit ? setCreateArticleOpen : undefined}
				onDelete={canDelete ? _handleDeleteArticle : undefined}
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
