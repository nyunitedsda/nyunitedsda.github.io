import {
	ArrowLeftOutlined,
	BookOutlined,
	CalendarOutlined,
	CommentOutlined,
	EyeOutlined,
	ShareAltOutlined,
	StarOutlined,
	TagOutlined,
	UserOutlined,
} from "@ant-design/icons";

import RingLoader from "@components/Loaders";
import ProjectSuspense from "@components/ProjectSuspense";
import { capitalize } from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { useQuery } from "@tanstack/react-query";
import { authorMetaInfo } from "@test/mock_data";
import { Button, Flex, Tag, Typography, theme } from "antd";
import type { CSSProperties, FC } from "react";
import { useNavigate, useParams } from "react-router";
import type { ArticleDT } from "@/api";
import { getDatabaseItem } from "@/api";

const backBtnSx: CSSProperties = {
	maxWidth: "150px",
	width: "auto",
	alignSelf: "flex-start",
};

const ICONS = {
	author: (
		<ProjectSuspense>
			<UserOutlined color="primary" />
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
	const navigate = useNavigate();
	const { token } = theme.useToken();

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
		<Flex vertical style={{ gap: 2 }}>
			<Stack spacing={2} >
				{/* Back Button */}

				<Button
					type="text"
					icon={<ArrowLeftOutlined style={{  color: token.colorPrimary  }} />}
					onClick={() => navigate(-1)}
					style={{ ...backBtnSx, color: token.colorPrimary }}
					size="medium"
				>
					Back
				</Button>

				{!isLoading || data ? (
					<>
						{/* Blog Image */}
						{data?.img_src && (
							<img src={data?.img_src as string} alt={`${data?.title} blog`} />
						)}

						<Typography.Title level={1} style={{ color: token.colorPrimary }}>
							{data?.title}
						</Typography.Title>

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
										<Typography.Text
											style={{
												fontWeight: "bold",
												color: token.colorTextSecondary,
											}}
										>
											{(() => {
												const value = data[i as keyof ArticleDT];
												return value instanceof Date
													? value.toLocaleDateString()
													: value;
											})()}
										</Typography.Text>
									</Stack>
								) : null,
							)}
						</Stack>

						{/* Content */}
						<Box sx={{ mb: 4 }}>
							<Typography.Paragraph style={{ lineHeight: 1.8, whiteSpace: 'pre-line' }}>
								{data?.content}
							</Typography.Paragraph>
						</Box>

						<Box sx={{ mb: 3 }}>
							<Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
								<TagOutlined
									style={{
										marginRight: 8,
										fontSize: "large",
										color: token.colorPrimary,
									}}
								/>
								<Typography.Title
									level={5}
									style={{ fontWeight: "bold", color: token.colorPrimary }}
								>
									Tags
								</Typography.Title>
							</Box>
							<Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
								{
									// FEATURE: Update database for multiple categories
									[data?.category]?.map((tag) => (
										<Tag
											key={tag}
											variant="filled"
											style={{
												borderRadius: "6px",
												backgroundColor: token.colorFillSecondary,
											}}
										>
											{tag}
										</Tag>
									))
								}
							</Box>
						</Box>
					</>
				) : (
					<RingLoader />
				)}
			</Stack>
		</Flex>
	);
};

export default BlogDetails;
