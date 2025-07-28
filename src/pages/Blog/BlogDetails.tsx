import { lazy } from "react";
import ProjectSuspense from "../../components/ProjectSuspense/ProjectSuspense";

const AccountCircleOutlined = lazy(
	() => import("@mui/icons-material/AccountCircleOutlined"),
);
const ArrowBackIosNewSharp = lazy(
	() => import("@mui/icons-material/ArrowBackIosNewSharp"),
);
const BookmarkAddOutlined = lazy(
	() => import("@mui/icons-material/BookmarkAddOutlined"),
);
const CalendarTodayOutlined = lazy(
	() => import("@mui/icons-material/CalendarTodayOutlined"),
);
const CommentOutlined = lazy(
	() => import("@mui/icons-material/CommentOutlined"),
);
const LocalOfferOutlined = lazy(
	() => import("@mui/icons-material/LocalOfferOutlined"),
);
const RateReviewOutlined = lazy(
	() => import("@mui/icons-material/RateReviewOutlined"),
);
const ShareOutlined = lazy(() => import("@mui/icons-material/ShareOutlined"));
const VisibilityOutlined = lazy(
	() => import("@mui/icons-material/VisibilityOutlined"),
);

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import type { SxProps, Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useQuery } from "@tanstack/react-query";
import type { FC } from "react";
import { useParams } from "react-router";
import { getDatabaseItem } from "../../api/request/commonQueries";
import type { ArticleDT } from "../../api/request/databaseTypes";
import Image from "../../components/Image/Image";
import RingLoader from "../../components/Loaders/RingLoader";
import { authorMetaInfo } from "../../test/mock_data/blogData";
import { capitalize } from "@mui/material";

const backBtnSx: SxProps<Theme> = {
	maxWidth: "150px",
	width: "auto",
	alignSelf: "flex-start",
};

const ICONS = {
	author: (
		<ProjectSuspense>
			<AccountCircleOutlined />
		</ProjectSuspense>
	),
	published_at: (
		<ProjectSuspense>
			<CalendarTodayOutlined />
		</ProjectSuspense>
	),
	views: (
		<ProjectSuspense>
			<VisibilityOutlined />
		</ProjectSuspense>
	),
	comments: (
		<ProjectSuspense>
			<CommentOutlined />
		</ProjectSuspense>
	),
	rating: (
		<ProjectSuspense>
			<RateReviewOutlined />
		</ProjectSuspense>
	),
	share: (
		<ProjectSuspense>
			<ShareOutlined />
		</ProjectSuspense>
	),
	save: (
		<ProjectSuspense>
			<BookmarkAddOutlined />
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
			author: capitalize(data.author),
		}),
	});

	return (
		<Stack spacing={2}>
			<Stack spacing={2} sx={{ "& a, svg": { color: "primary.light" } }}>
				{/* Back Button */}

				<Button
					variant="text"
					startIcon={<ArrowBackIosNewSharp />}
					color="primary"
					component={"a"}
					href="/blog"
					sx={backBtnSx}
				>
					Back
				</Button>
				<>
					{!isLoading || data ? (
						<>
							{/* Blog Image */}
							{data?.img_src && (
								<Image image={{ src: data?.img_src as string }} />
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
									) : (
										<></>
									),
								)}
							</Stack>

							{/* Content */}
							<Box sx={{ mb: 4 }}>
								<Typography
									variant="body1"
									sx={{ lineHeight: 1.8 }}
									dangerouslySetInnerHTML={{
										__html: data?.content as string,
									}}
								/>
							</Box>

							<Box sx={{ mb: 3 }}>
								<Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
									<LocalOfferOutlined
										fontSize="small"
										sx={{ mr: 1, color: "primary.light" }}
									/>
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
										[data?.category]?.map((tag, index) => (
											<Chip
												key={index}
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
				</>
			</Stack>
		</Stack>
	);
};

export default BlogDetails;
