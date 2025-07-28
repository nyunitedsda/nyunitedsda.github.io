import { Stack } from "@mui/material";
import type { FC } from "react";
import Carousel from "../../components/Carousel/Carousel";
import PageAnnouncements from "./components/AnnouncementCard/PageAnnouncements";
import SectionWrapper from "./components/SectionWrapper";
import sliderImages from "./sliderImages";

import PageMinistries from "./components/Ministries/PageMinistries";
import { HOME_CONSTANTS } from "./homeConstants";

const { rootSx } = HOME_CONSTANTS;

const Home: FC = () => {
	return (
		<Stack sx={rootSx}>
			{/* Image Slides */}
			<SectionWrapper>
				<Carousel
					options={{
						align: "center",
						startIndex: 0,
					}}
					sx={{
						"& .embla__slide": {
							height: { xs: "350px", sm: "unset" },
						},
					}}
				>
					{sliderImages.map((i) => (
						<Stack direction="row" className="embla__slide" key={i.src}>
							<img
								loading="lazy"
								className="embla__slide__number"
								src={i.src}
								alt={i.alt ?? `${i.src}-image`}
							/>
						</Stack>
					))}
				</Carousel>
			</SectionWrapper>

			{/* Notification Slides */}
			<PageAnnouncements />

			{/* Ministries content */}
			<PageMinistries />
		</Stack>
	);
};

export default Home;
