import RingLoader from "@components/Loaders";
import { PageTitle } from "@components/PageWrapper";
import ProjectCard from "@components/ProjectCard";
import CalendarToday from "@mui/icons-material/CalendarToday";
import Grid from "@mui/material/Grid";
import type { SxProps, Theme } from "@mui/material/styles";
import { capitalize } from "@mui/material/utils";
import { type CSSProperties, type FC, useCallback, useMemo, useState } from "react";
import { useLoaderData } from "react-router";
import type { ArticleDT } from "@/api";
import {
	BLOG_HEADER,
	BLOG_SUBHEADER,
	DEFAULT_POST_PER_PAGE,
} from "./blogConstant";
import { Button, Flex, Pagination, Typography } from "antd";

const containerSx: SxProps<Theme> = {
	alignContent: "flex-start",
	display: "flex",
	flexGrow: 1,
	flexWrap: "wrap",
	"& .MuiCard-root": {
		height: (theme) => `${theme.spacing(32.5)}`,
		justifySelf: "center",
		textOverflow: "ellipsis",
		whiteSpace: "break-spaces",
		"& svg, .MuiButton-root": {
			color: "primary.light",
		},
	},
};

const paginationSx: CSSProperties = {
	justifyContent: "center",
	bottom: 0,
};

const Blog: FC = () => {
	const [page, setPage] = useState(1);
	const [postsPerPage, _setPostsPerPage] = useState<number>(
		DEFAULT_POST_PER_PAGE,
	);

	const { blogs, isLoading } = useLoaderData();

	const totalPages = useMemo(
		() => Math.ceil((blogs || []).length / postsPerPage),
		[blogs, postsPerPage],
	);

	const currentPosts: ArticleDT[] = useMemo(
		() => (blogs ?? []).slice((page - 1) * postsPerPage, page * postsPerPage),
		[blogs, postsPerPage, page],
	);

	const handlePageChange = useCallback(
		( value: number) => {
			setPage(value);
			window.scrollTo({ top: 0, behavior: "smooth" });
		},
		[],
	);

	return (
		<>
			<PageTitle title={BLOG_HEADER} subtitle={BLOG_SUBHEADER} />
			<Grid container spacing={4} sx={containerSx}>
				{isLoading ? (
					<RingLoader />
				) : (
					currentPosts.map(({ id, title, author, content, published_at }) => (
						<Grid size={{ xs: 12, md: 6 }} key={id}>
							<ProjectCard
								header={{
									title,
									description: `${new Date(published_at).toLocaleDateString()} | ${capitalize(author ?? "")}`,
									avatar: <CalendarToday />,
								}}
								actions={
									[<Button
										style={{ height: '100%' }}
										href={`/blog/${id}`}
										type="text"
									>
										Read More
									</Button>, ,,]
								}
							>
								<Typography.Paragraph
									ellipsis={{ rows: 3 }}
								>
									{content}
								</Typography.Paragraph>
							</ProjectCard>
						</Grid>
					))
				)}
			</Grid>

			<Flex vertical={false} style={paginationSx}>
				<Pagination
					total={totalPages}
					// page={page}
					defaultCurrent={1}
					onChange={handlePageChange}
					// color="primary"
					size="medium"
				/>
			</Flex>
		</>
	);
};

export default Blog;
