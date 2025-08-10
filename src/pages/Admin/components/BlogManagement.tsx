import { useQuery } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { type FC, useCallback, useState } from "react";
import type { ArticleDT } from "../../../api/request";
import { getDatabaseList } from "../../../api/request/commonQueries";
import { deleteEntity } from "../../../api/request/mutations";
import DataTable from "../../../components/DataTable/DataTable";
import PageTitle from "../../../components/PageWrapper/PageTitle";
import BlogEditor from "../../../forms/collection/BlogEditor/BlogEditor";
import usePermission from "../../../hooks/auth/usePermission";
import { initialArticle } from "../../../test/mock_data";

import articleColumns from "../constants/articleColumns";

const BLOG_SUBHEADER = "Manage blog articles";

const BlogManagement: FC = () => {
	const { enqueueSnackbar } = useSnackbar();
	const { canCreate, canEdit, canDelete } = usePermission("articles");

	const [createArticleOpen, setCreateArticleOpen] =
		useState<Partial<ArticleDT> | null>(null);

	const {
		data: queryData,
		refetch,
		isLoading,
	} = useQuery<Partial<ArticleDT>[] | undefined>({
		queryKey: ["articles"],
		queryFn: () => getDatabaseList("articles"),
		staleTime: 5 * 60 * 1000,
		refetchOnWindowFocus: false,
	});

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
				data={queryData as ArticleDT[]}
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
