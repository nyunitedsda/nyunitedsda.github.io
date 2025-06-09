import CalendarToday from "@mui/icons-material/CalendarToday";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { SxProps, Theme } from "@mui/material/styles";
import { type FC, useCallback, useMemo, useState } from "react";
import PageTitle from "../../components/PageWrapper/PageTitle";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import blogPosts from "./blogPosts";

const containerSx: SxProps<Theme> = {
	alignContent: "flex-start",
	display: "flex",
	flexGrow: 1,
	flexWrap: "wrap",
	"& .MuiCard-root": {
		height: (theme) => `${theme.spacing(32.5)}`,
		// overflow: "hidden",
		textOverflow: "ellipsis",
		whiteSpace: "break-spaces",
		'& svg, .MuiButton-root': {
			color: 'primary.light',
		}
	},
};

const paginationSx: SxProps<Theme> = {
	justifyContent: "center",
	bottom: 0,
	mt: 6,
};

const DEFAULT_POST_PER_PAGE = 4;
const HEADER = "Our Blog";
const SUBHEADER =
	"Insights, reflections, and spiritual guidance from our church community.";
const PREVIEW_LENGTH = 140;

// FEATURE: Add the blog display page, with route, api call, and render enable the `Read more` button
// FEATURE: Add the ability to change the pagination of blog post

const Blog: FC = () => {
	const [page, setPage] = useState(1);
	const [postsPerPage, _setPostsPerPage] = useState<number>(
		DEFAULT_POST_PER_PAGE,
	);

	const totalPages = useMemo(
		() => Math.ceil(blogPosts.length / postsPerPage),
		[blogPosts, postsPerPage],
	);

	const currentPosts = useMemo(
		() => blogPosts.slice((page - 1) * postsPerPage, page * postsPerPage),
		[blogPosts, postsPerPage, page],
	);

	const handlePageChange = useCallback(
		(_event: React.ChangeEvent<unknown>, value: number) => {
			setPage(value);
			window.scrollTo({ top: 0, behavior: "smooth" });
		},
		[],
	);

	return (
		<>
			<PageTitle title={HEADER} subtitle={SUBHEADER} />
			<Grid container spacing={4} sx={containerSx}>
				{currentPosts.map(({ id, title, author, content, publishDate }) => (
					<Grid size={{ xs: 12, md: 6 }} key={id} className="blog-card">
						<ProjectCard
							header={{
								title,
								subheader: `${new Date(publishDate).toLocaleDateString()} | ${author}`,
								avatar: <CalendarToday />,
							}}
							content={
								<Typography variant="body1">
									{content.length > PREVIEW_LENGTH
										? `${content.slice(0, PREVIEW_LENGTH)}...`
										: content}
								</Typography>
							}
							actions={
								<Button
									size="small"
									color="primary"
									component={"a"}
									href={`/blog/${id}`}
								>
									Read More
								</Button>
							}
						/>
					</Grid>
				))}
			</Grid>

			<Stack direction={"row"} sx={paginationSx}>
				<Pagination
					count={totalPages}
					page={page}
					onChange={handlePageChange}
					color="primary"
					size="large"
				/>
			</Stack>
		</>
	);
};

export default Blog;
