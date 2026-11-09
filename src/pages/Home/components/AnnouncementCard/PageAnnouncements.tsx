import RingLoader from "@components/Loaders";
import { AnnouncementCard, SectionWrapper } from "@pages/Home";
import { Carousel, Grid } from "antd";
import type { FC } from "react";
import { useLoaderData } from "react-router-dom";
import type { AnnouncementDT } from "@/api";

const PAGE_ANNOUNCEMENT_HEADER = "Announcements";

const PageAnnouncements: FC = () => {
	const { announcements, isLoading } = useLoaderData();
	const isMobile = Grid.useBreakpoint()?.md === false;

	return (
		<SectionWrapper header={PAGE_ANNOUNCEMENT_HEADER}>
			<Carousel
				arrows
				autoplay
				autoplaySpeed={5000}
				adaptiveHeight
				infinite
				slidesToShow={isMobile ? 1 : 3}
			>
				{!isLoading && announcements ? (
					((announcements ?? []) as AnnouncementDT[]).map((i) => (
						<AnnouncementCard key={i.id} {...i} />
					))
				) : (
					<RingLoader />
				)}
			</Carousel>
		</SectionWrapper>
	);
};

export default PageAnnouncements;
