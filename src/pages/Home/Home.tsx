import {
	Box,
	Stack,
	type SxProps,
	type Theme,
	Typography,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import { type FC, useMemo } from "react";

import Slider from "react-slick";
import Image from "../../components/Image/Image";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import MinistryCard from "./components/MinistryCard";
import NotificationCard from "./components/NotificationCard/NotificationCard";
import { ministries } from "./constants";
import { notifications } from "./notifications";
import sliderImages from "./sliderImages";

import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
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

const titleSx: SxProps<Theme> = {
	// mb: 4,
	fontWeight: "bold",
	color: "primary.main",
	textAlign: "center",
	width: "100%",
};

const MINISTRIES_HEADER = "Ministries Links";
const LATEST_NOTIFICATIONS_HEADER = "Latest Notifications";
// const LEARN_MORE_LABEL = "Learn More";
const settings = {
	// autoplay: true,
	autoplaySpeed: 7000,
	dots: true,
	infinite: true,
	speed: 500,
	slidesToShow: 1,
	slidesToScroll: 1,
	adaptiveHeight: false,
};

const Home: FC = () => {
	const theme = useTheme();;
	const largeDevice = useMediaQuery(theme.breakpoints.up('lg'))
	const mediumDevice = useMediaQuery(theme.breakpoints.up('md'))

	const sliderSettings = useMemo(() => {

		// if (largeDevice) {
		// 	return ({
		// 		dots: true,
		// 		infinite: false,
		// 		// speed: 500,
		// 		slidesToShow: 3,
		// 		slidesToScroll: 1,
		// 		adaptiveHeight: false,
		// 		useCSS: true,
		// 	})
		// }
		// else
		if (mediumDevice) {
			return ({
				// dots: true,
				// infinite: true,
				centerMode: true,
				centerPadding: '20px',
				className: 'center',
				slidesToShow: 2,
				slidesToScroll: 1,
				adaptiveHeight: false,
				// useCSS: true,
				initialSlide: 1,
			})
		}


		return ({

			slidesToShow: 1,
			slidesToScroll: 1,
			adaptiveHeight: false,
			useCSS: true,
		})

	}, [largeDevice, mediumDevice]);

	return (
		<>
			<PageWrapper>
				<Stack sx={{ flexGrow: 1, width: '100%', gap: 5 }}>

					<SectionWrapper>
					<Box
						className="slider-container"
						sx={{
							display: 'flex',
							flexDirection: 'column',

							// borderRadius: 1,
							// mb: 8,
							height: (theme) => ({
								xs: `${theme.spacing(36)}`,
								md: `${theme.spacing(78)}`,
								'& .slick-list': {
									height: '100%',
								},
								'& .slick-slider': {
									height: 'calc(100% - 64px)',
								},
								'& .slick-track': {
									height: '100%',
								},
								'& .slick-dots': {
									textOverflow: 'ellipsis',
									whiteSpace: 'nowrap',
									width: '100%',
									textAlign: 'center',
									bottom: '-25px',
								},
							}),
						}}
					>
						<Slider {...settings}>
							{sliderImages.map((i) => (
								<Image
									key={i.src}
									image={{
										src: i.src,
										alt: i.alt,
									}}
									root={{
										sx: {
											height: // '100%',
											{
												xs: (theme) => `${theme.spacing(30)}`,
												md: (theme) => `${theme.spacing(60)}`,
											},
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
						</Slider>
					</Box>
					</SectionWrapper>

					<SectionWrapper header={LATEST_NOTIFICATIONS_HEADER} >
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',

								borderRadius: 1,
								// mb: 8,
								height: (theme) => ({
									xs: `${theme.spacing(47)}`,
									md: `${theme.spacing(50)}`,
								}),
								'& .slick-list': {
									height: '100%',
								},
								'& .slick-track': {
									height: '100%',
								},
								'& .slick-slider': {
									height: '100%',
								},
								'& .slick-dots': {
									textOverflow: 'ellipsis',
									whiteSpace: 'nowrap',
									width: '100%',
									textAlign: 'center',
									bottom: 0,
								},
								'& .MuiPaper-root': {
									maxWidth: '415Px',
									width: '99%',
									height: '100%',
									minHeight: (theme) => ({
										xs: `${theme.spacing(40)}`,
										md: `${theme.spacing(40)}`,
									}),
								},
								'& .MuiCardActions-root': {
									p: 2,
									pt: 0,
									// height: '100px',
								},
							}}
						>
							<Slider {...{
								...sliderSettings,

								useCSS: true,
								// centerPadding: '20px',
								// className: 'center',
								// initialSlide: 0,
								dots: true,
								infinite: true,
							}}>
								{
									notifications.map((i) => (
										<NotificationCard key={i.id} {...i} />
									))
								}
							</Slider>
						</Box>
					</SectionWrapper>


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
