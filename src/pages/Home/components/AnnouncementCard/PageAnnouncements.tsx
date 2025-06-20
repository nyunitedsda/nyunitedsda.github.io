import { useQuery } from "@tanstack/react-query";
import type { FC } from "react";
import { getDatabaseList } from "../../../../api/request/commonQueries";
import Carousel from "../../../../components/Carousel/Carousel";
import RingLoader from "../../../../components/Loaders/RingLoader";
import type { EventAnnouncement } from "../../types";
import SectionWrapper from "../SectionWrapper";
import AnnouncementCard from "./AnnouncementCard";

const PAGE_ANNOUNCEMENT_HEADER = "Announcements";

const PageAnnouncements: FC = () => {
	const { isLoading, data } = useQuery({
		queryKey: ["get-announcements"],
		queryFn: async () =>
			await getDatabaseList<EventAnnouncement>("announcements"),
		select: (res) => (res.data as EventAnnouncement[]) || [],
	});

	return (
		<SectionWrapper header={PAGE_ANNOUNCEMENT_HEADER}>
			<Carousel
				autoplay
				options={{
					loop: true,
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
					// <Stack direction={"row"} sx={{alignItems: "center", justifyItems: "center", width: "100%", minHeight: 200, }} >
					<RingLoader />
					// </Stack>
				)}
			</Carousel>
		</SectionWrapper>
	);
};

export default PageAnnouncements;
