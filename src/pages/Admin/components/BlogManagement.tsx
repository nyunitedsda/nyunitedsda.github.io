import DataTable from "@components/DataTable";
import { PageTitle } from "@components/PageWrapper";
import { BlogEditor } from "@forms/collection";
import { useEntityList } from "@hooks/api";
import { usePermission } from "@hooks/auth";
import { initialArticle } from "@test/mock_data";
import { useSnackbar } from "notistack";
import { type FC, useCallback, useState } from "react";
import type { ArticleDT } from "@/api";
import { deleteEntity } from "@/api";
import articleColumns from "../constants/articleColumns";

const BLOG_SUBHEADER = "Manage blog articles";

const BlogManagement: FC = () => {
	const { enqueueSnackbar } = useSnackbar();
	const { canCreate, canEdit, canDelete } = usePermission("articles");

	const [createArticleOpen, setCreateArticleOpen] =
		useState<Partial<ArticleDT> | null>(null);
	const {
		data: queryData,
		isLoading,
		refetch,
	} = useEntityList<ArticleDT>("articles");

	const _handleDeleteArticle = useCallback(
		(data: Partial<ArticleDT>) => {
			const { id } = data as ArticleDT;
			deleteEntity("articles", id)
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
		[refetch, enqueueSnackbar],
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
				isLoading={isLoading}
				data={queryData ?? []}
				columns={articleColumns}
				onEdit={canEdit ? setCreateArticleOpen : undefined}
				onDelete={canDelete ? _handleDeleteArticle : undefined}
			/>

			{createArticleOpen && (
				<BlogEditor
					open={!!createArticleOpen}
					data={createArticleOpen as ArticleDT}
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
