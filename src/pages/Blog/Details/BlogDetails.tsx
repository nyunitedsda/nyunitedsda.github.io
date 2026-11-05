import { ArrowLeftOutlined, BookOutlined, CalendarOutlined, CommentOutlined, EyeOutlined, ShareAltOutlined, StarOutlined, TagOutlined, UserOutlined } from "@ant-design/icons";




import RingLoader from "@components/Loaders";
import ProjectSuspense from "@components/ProjectSuspense";
import { capitalize } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import type { SxProps, Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useQuery } from "@tanstack/react-query";
import { authorMetaInfo } from "@test/mock_data";
import type { FC } from "react";
import { useParams } from "react-router";
import type { ArticleDT } from "@/api";
import { getDatabaseItem } from "@/api";

const backBtnSx: SxProps<Theme> = {
	maxWidth: "150px",
	width: "auto",
	alignSelf: "flex-start",
};

const ICONS = {
	author: (
		<ProjectSuspense>
			<UserOutlined />
		</ProjectSuspense>
	),
	published_at: (
		<ProjectSuspense>
			<CalendarOutlined />
		</ProjectSuspense>
	),
	views: (
		<ProjectSuspense>
			<EyeOutlined />
		</ProjectSuspense>
	),
	comments: (
		<ProjectSuspense>
			<CommentOutlined />
		</ProjectSuspense>
	),
	rating: (
		<ProjectSuspense>
			<StarOutlined />
		</ProjectSuspense>
	),
	share: (
		<ProjectSuspense>
			<ShareAltOutlined />
		</ProjectSuspense>
	),
	save: (
		<ProjectSuspense>
			<BookOutlined />
		</ProjectSuspense>
	),
};
const BlogDetails: FC = () => {
	const { id } = useParams();

	const { isLoading, data } = useQuery({
		queryKey: ["get-article-id", id],
		queryFn: async () =>
			await getDatabaseItem<ArticleDT>("articles", parseInt(id as string, 10)),
		select: (data) => ({
			...data,
			...(data?.author && { author: capitalize(data?.author) }),
		}),
	});

	return (
		<Stack spacing={2}>
			<Stack spacing={2} sx={{ "& a, svg": { color: "primary.light" } }}>
				{/* Back Button */}

				<Button
					variant="text"
					startIcon={<ArrowLeftOutlined />}
					color="primary"
					component={"a"}
					href="/blog"
					sx={backBtnSx}
				>
					Back
				</Button>

				{!isLoading || data ? (
					<>
						{/* Blog Image */}
						{data?.img_src && (
							<img src={data?.img_src as string} alt={`${data?.title} blog`} />
						)}

						<Typography
							variant="h4"
							component="h1"
							sx={{ color: "primary.light" }}
						>
							{data?.title}
						</Typography>

						{/* Author info */}
						<Stack
							direction="row"
							flexWrap={"wrap"}
							justifyContent={"flex-start"}
							spacing={2}
						>
							{authorMetaInfo.map((i) =>
								data?.[i as keyof ArticleDT] ? (
									<Stack
										direction={"row"}
										spacing={1}
										key={i}
										sx={{
											alignItems: "center",
											color: "primary.contrastText",
										}}
									>
										{ICONS[i as keyof typeof ICONS]}
										<Typography
											variant="body2"
											sx={{ fontWeight: "bold", color: "text.secondary" }}
										>
											{(() => {
												const value = data[i as keyof ArticleDT];
												return value instanceof Date
													? value.toLocaleDateString()
													: value;
											})()}
										</Typography>
									</Stack>
								) : null,
							)}
						</Stack>

						{/* Content */}
						<Box sx={{ mb: 4 }}>
							<Typography variant="body1" sx={{ lineHeight: 1.8 }}>
								{data?.content}
							</Typography>
						</Box>

						<Box sx={{ mb: 3 }}>
							<Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>

								<TagOutlined color="primary" style={{ marginRight: 8, fontSize: "large" }} />
								<Typography
									variant="h6"
									sx={{ fontWeight: "bold", color: "primary.light" }}
								>
									Tags
								</Typography>
							</Box>
							<Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
								{
									// FEATURE: Update database for multiple categories
									[data?.category]?.map((tag) => (
										<Chip
											key={tag}
											label={tag}
											size="small"
											variant="outlined"
											sx={{
												"&:hover": {
													bgcolor: "primary.light",
													color: "white",
												},
											}}
										/>
									))
								}
							</Box>
						</Box>
					</>
				) : (
					<RingLoader />
				)}
			</Stack>
		</Stack>
	);
};

export default BlogDetails;
