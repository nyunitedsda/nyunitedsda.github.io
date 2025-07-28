import { useQuery } from "@tanstack/react-query";
import type { FC } from "react";
import { getDatabaseList } from "../../../../api/request/commonQueries";
import Carousel from "../../../../components/Carousel/Carousel";
import RingLoader from "../../../../components/Loaders/RingLoader";
import type { EventAnnouncement } from "../../types";
import SectionWrapper from "../SectionWrapper";
import AnnouncementCard from "./AnnouncementCard";
import type { AnnouncementDT } from "../../../../api/request/databaseTypes";

const PAGE_ANNOUNCEMENT_HEADER = "Announcements";

const PageAnnouncements: FC = () => {
	const { isLoading, data } = useQuery<AnnouncementDT[]>({
		queryKey: ["get-announcements"],
		queryFn: async () =>
			await getDatabaseList("announcements"),
		staleTime: 10 * 60 * 1000, // 10 minutes
		gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
		// Show stale data while refetching to avoid loading screen flash
		placeholderData: (previousData) => previousData,
		// Retry failed requests with exponential backoff
		retry: 2,
		retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
	});


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
