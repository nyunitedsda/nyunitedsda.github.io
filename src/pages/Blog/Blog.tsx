import CalendarToday from "@mui/icons-material/CalendarToday";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import type { SxProps, Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useQuery } from "@tanstack/react-query";
import { type FC, useCallback, useMemo, useState } from "react";
import { getDatabaseList } from "../../api/request/commonQueries";
import type { ArticleDT } from "../../api/request/databaseTypes";
import RingLoader from "../../components/Loaders/RingLoader";
import PageTitle from "../../components/PageWrapper/PageTitle";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import {
	BLOG_HEADER,
	BLOG_PREVIEW_LENGTH,
	BLOG_SUBHEADER,
	DEFAULT_POST_PER_PAGE,
} from "./blogConstant";
import { capitalize } from "@mui/material/utils";

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

const paginationSx: SxProps<Theme> = {
	justifyContent: "center",
	bottom: 0,
	mt: 6,
};

const Blog: FC = () => {
	const [page, setPage] = useState(1);
	const [postsPerPage, _setPostsPerPage] = useState<number>(
		DEFAULT_POST_PER_PAGE,
	);

	const { isLoading, data } = useQuery<ArticleDT[]>({
		queryKey: ["get-articles"],
		queryFn: async () => (await getDatabaseList("articles")) as ArticleDT[],
	});

	const totalPages = useMemo(
		() => Math.ceil((data || []).length / postsPerPage),
		[data, postsPerPage],
	);

	const currentPosts: ArticleDT[] = useMemo(
		() => (data ?? []).slice((page - 1) * postsPerPage, page * postsPerPage),
		[data, postsPerPage, page],
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
									subheader: `${new Date(published_at).toLocaleDateString()} | ${capitalize(author)}`,
									avatar: <CalendarToday />,
								}}
								content={
									<Typography
										component="div"
										variant="body1"
										sx={{ "& p": { m: 0 } }}
										dangerouslySetInnerHTML={{
											__html: `${
												content.length > BLOG_PREVIEW_LENGTH
													? content.slice(0, BLOG_PREVIEW_LENGTH)
													: content
											}`,
										}}
									/>
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
					))
				)}
			</Grid>

			<Stack direction={"row"} sx={paginationSx}>
				<Pagination
					count={totalPages}
					page={page}
					onChange={handlePageChange}
					color="primary"
					size="medium"
				/>
			</Stack>
		</>
	);
};

export default Blog;
