import {
	AccountCircleOutlined,
	ArrowBackIosNewSharp,
	BookmarkAddOutlined,
	LocalOfferOutlined,
	ShareOutlined,
} from "@mui/icons-material";
import CalendarTodayOutlined from "@mui/icons-material/CalendarTodayOutlined";
import CommentOutlined from "@mui/icons-material/CommentOutlined";
import RateReviewOutlined from "@mui/icons-material/RateReviewOutlined";
import VisibilityOutlined from "@mui/icons-material/VisibilityOutlined";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { type FC, useEffect, useState } from "react";
import { useParams } from "react-router";
import PageTitle from "../../components/PageWrapper/PageTitle";
import { authorMetaInfo } from "./blogData";
import blogPosts from "./blogPosts";
import type { BlogType } from "./types";
import RingLoader from "../../components/Loaders/RingLoader";

const ICONS = {
	author: <AccountCircleOutlined />,
	publishDate: <CalendarTodayOutlined />,
	views: <VisibilityOutlined />,
	comments: <CommentOutlined />,
	rating: <RateReviewOutlined />,
	share: <ShareOutlined />,
	save: <BookmarkAddOutlined />,
};

const BlogDetails: FC = () => {
	const [blog, setBlog] = useState<BlogType>();
	const { id } = useParams();

	useEffect(() => {
		if (id) {
			const blogId = Number.parseInt(id, 10);
			if (!isNaN(blogId)) {
				const post: BlogType | undefined = blogPosts.find(
					(i) => i.id === blogId,
				);
				if (post) {
					setBlog(post);
				}
			}
		}
	}, [id]);

	return (
		<Stack spacing={2}>
			<PageTitle title="Blog Details" />
			<Stack spacing={2}>
				<Button
					variant="text"
					startIcon={<ArrowBackIosNewSharp />}
					component={"a"}
					href="/blog"
					sx={{
						color: "primary.light",
						maxWidth: "150px",
						width: "auto",
						alignSelf: "flex-start",
					}}
				>
					Back to Blog
				</Button>
				<>
					{blog ? (
						<>
							<Typography
								variant="h4"
								component="h1"
								sx={{ color: "primary.light" }}
							>
								{blog?.title}
							</Typography>

							<Stack
								direction="row"
								flexWrap={"wrap"}
								justifyContent={"flex-start"}
								spacing={2}
							>
								{authorMetaInfo.map((i) => (
									<Stack
										direction={"row"}
										spacing={1}
										key={i}
										sx={{ alignItems: "center", color: "primary.contrastText" }}
									>
										{ICONS[i as keyof typeof ICONS]}
										<Typography
											variant="body2"
											sx={{ fontWeight: "bold", color: "text.secondary" }}
										>
											{blog?.[i as keyof typeof blog]}
										</Typography>
									</Stack>
								))}
							</Stack>

							{/* <Stack direction="row" spacing={2}>
								{actionButtons.map((i) => (
									<IconButton size="small" sx={{ bgcolor: "action.hover" }}>
										{ICONS[i as keyof typeof ICONS]}
									</IconButton>
								))}
							</Stack> */}

							<Box sx={{ mb: 4 }}>
								{blog?.content.split("\n\n").map((paragraph, index) => (
									<Typography
										key={index}
										variant="body1"
										sx={{ lineHeight: 1.8 }}
									>
										{paragraph}
									</Typography>
								))}
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
									{blog?.tags?.map((tag, index) => (
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
									))}
								</Box>
							</Box>
						</>
					) : (
						<RingLoader/>
					)}
				</>
			</Stack>
		</Stack>
	);
};

export default BlogDetails;
