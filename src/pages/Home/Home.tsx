import { Stack, type SxProps, type Theme, useMediaQuery } from "@mui/material";
import { type FC, useMemo } from "react";
import Image from "../../components/Image/Image";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import MinistryCard from "./components/MinistryCard";
import NotificationCard from "./components/NotificationCard/NotificationCard";
import { ministries } from "./constants";
import { notifications } from "./notifications";
import sliderImages from "./sliderImages";
import ProjectSlider from "../../components/ProjectSlider/ProjectSlider";
import SectionWrapper from "./components/SectionWrapper";

const imageRootSx: SxProps<Theme> = {
	width: "100%",
	display: "flex",
	justifyContent: "center",
	height: (theme) => `${theme.spacing(11)}`,
	p: 1,
};

const cardContainerSx: SxProps<Theme> = {
	alignItems: { xs: "center", md: "flex-start" },
	flexWrap: "wrap",
	gap: 2,
	width: "100%",
	"& .MuiPaper-root": {
		height: (theme) => `${theme.spacing(36)}`,
		maxWidth: { md: "32%" },
	},
	"& .MuiCardActions-root": {
		p: 0,
	},
};

const MINISTRIES_HEADER = "Ministries Links";
const LATEST_NOTIFICATIONS_HEADER = "Latest Notifications";

const Home: FC = () => {
	const mediumDevice = useMediaQuery((theme) => theme.breakpoints.up("md"));

	const sliderSettings = useMemo(() => {
		if (mediumDevice) {
			return {
				centerMode: true,
				centerPadding: "20px",
				className: "center",
				slidesToShow: 2,
				slidesToScroll: 1,
				initialSlide: 1,
			};
		}

		return {
			initialSlide: 1,
			slidesToShow: 1,
			slidesToScroll: 1,
		};
	}, [mediumDevice]);

	return (
		<>
			<PageWrapper>
				<Stack sx={{ flexGrow: 1, width: "100%", gap: 5 }}>
					{/* Image Slides */}
					<SectionWrapper>
						<ProjectSlider
							settings={{
								autoplay: true,
								speed: 500,
							}}
							sx={{
								height: (theme) => ({
									xs: `${theme.spacing(47)}`,
									md: `${theme.spacing(78)}`,
								}),
							}}
						>
							{sliderImages.map((i) => (
								<Image
									key={i.src}
									image={{
										src: i.src,
										alt: i.alt,
									}}
									root={{
										sx: {
											height: (theme) => ({
												xs: `${theme.spacing(30)}`,
												md: `${theme.spacing(60)}`,
											}),
											width: "100%",
											"& img": {
												width: "100%",
												height: "auto",
												objectFit: "cover !important",
											},
										},
									}}
								/>
							))}
						</ProjectSlider>
					</SectionWrapper>

					{/* Notification Slides */}
					<SectionWrapper header={LATEST_NOTIFICATIONS_HEADER}>
						<ProjectSlider
							settings={sliderSettings}
							sx={{
								height: (theme) => ({
									xs: `${theme.spacing(47)}`,
									md: `${theme.spacing(50)}`,
								}),
								"& .MuiPaper-root": {
									maxWidth: "415Px",
									width: "99%",
									height: "100%",
									minHeight: (theme) => ({
										xs: `${theme.spacing(40)}`,
										md: `${theme.spacing(40)}`,
									}),
								},
								"& .MuiCardActions-root": {
									p: 2,
									pt: 0,
								},
							}}
						>
							{notifications.map((i) => (
								<NotificationCard key={i.id} {...i} />
							))}
						</ProjectSlider>
					</SectionWrapper>

					{/* Ministries content */}
					<SectionWrapper header={MINISTRIES_HEADER}>
						<Stack direction={{ xs: "column", md: "row" }} sx={cardContainerSx}>
							{ministries.map((i) => (
								<MinistryCard
									{...{
										header: { title: i.title },
										content: i.content,
										link: i.link,
										image: {
											root: {
												sx: imageRootSx,
											},
											image: {
												src: i.image,
												alt: `${i.title} image`,
											},
										},
									}}
									key={`${i.title} image`}
								/>
							))}
						</Stack>
					</SectionWrapper>
				</Stack>
			</PageWrapper>
		</>
	);
};

export default Home;
