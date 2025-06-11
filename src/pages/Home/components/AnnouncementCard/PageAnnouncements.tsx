import type { FC } from "react";
import { performQuery } from "../../../../api/queryData";
import { getAnnouncements } from "../../../../api/request/announcement";
import Carousel from "../../../../components/Carousel/Carousel";
import RingLoader from "../../../../components/Loaders/RingLoader";
import type { EventAnnouncement } from "../../types";
import SectionWrapper from "../SectionWrapper";
import AnnouncementCard from "./AnnouncementCard";

const PAGE_ANNOUNCEMENT_HEADER = "Announcements";

const PageAnnouncements: FC = () => {
	const { isLoading, data } = performQuery(
		["get-announcements"],
		getAnnouncements,
	);

  console.log('data: ', data);
	return (
		<SectionWrapper header={PAGE_ANNOUNCEMENT_HEADER}>
			<Carousel
				sx={{
					"& .embla__viewport .embla__container": {
						gap: 2,
						py: 2,
						px: 1,
					},
				}}
			>
				{!isLoading && data ? (
					((data ?? []) as EventAnnouncement[]).map((i) => (
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
