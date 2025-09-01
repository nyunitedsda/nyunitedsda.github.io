import Carousel from "@components/Carousel";
import RingLoader from "@components/Loaders";
import { AnnouncementCard, SectionWrapper } from "@pages/Home";
import type { FC } from "react";
import { useLoaderData } from "react-router-dom";
import type { AnnouncementDT } from "@/api";

const PAGE_ANNOUNCEMENT_HEADER = "Announcements";

const PageAnnouncements: FC = () => {
	const { announcements, isLoading } = useLoaderData();

	return (
		<SectionWrapper header={PAGE_ANNOUNCEMENT_HEADER}>
			<Carousel
				autoplay
				options={{
					loop: true,
					containScroll: "trimSnaps",
					dragFree: true,
				}}
				sx={{
					"& .embla__viewport .embla__container": {
						gap: 2,
						py: 2,
						px: 1,
					},
				}}
			>
				{!isLoading && announcements ? (
					((announcements ?? []) as AnnouncementDT[]).map((i) => (
						<AnnouncementCard className="embla__slide" key={i.id} {...i} />
					))
				) : (
					<RingLoader />
				)}
			</Carousel>
		</SectionWrapper>
	);
};

export default PageAnnouncements;
