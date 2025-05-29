import { Stack, type SxProps, type Theme } from "@mui/material";
import { type FC } from "react";
import Carousel from "../../components/Carousel/Carousel";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import MinistryCard from "./components/MinistryCard";
import NotificationCard from "./components/NotificationCard/NotificationCard";
import SectionWrapper from "./components/SectionWrapper";
import { ministries } from "./constants";
import { notifications } from "./notifications";
import sliderImages from "./sliderImages";

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

	return (
		<>
			<PageWrapper>
				<Stack sx={{ flexGrow: 1, width: "100%", gap: 5 }}>
					{/* Image Slides */}
					<SectionWrapper>

						<Carousel>
							{sliderImages.map((i) => (
								<div className="embla__slide" key={i.src}>

									<img className="embla__slide__number" src={i.src} alt={i.alt ?? `${i.src}-image`} />
								</div>
							))}
						</Carousel>
					</SectionWrapper>

					{/* Notification Slides */}
					<SectionWrapper header={LATEST_NOTIFICATIONS_HEADER}>
						<Carousel sx={{
							'& .embla__viewport .embla__container': {
								gap: 2,
								py: 2,
								px: 1,
							},
						}}>
							{
								notifications.map((i) => (
									<NotificationCard
										className="embla__slide"
										key={i.id}
										{...i}
									/>
								))
							}
						</Carousel>
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
