import Stack from "@mui/material/Stack";
import { useQuery } from "@tanstack/react-query";
import type { FC } from "react";
import type { MinistriesDT } from "../../../../api/request";
import { getDatabaseList } from "../../../../api/request/commonQueries";
import RingLoader from "../../../../components/Loaders/RingLoader";
import { HOME_CONSTANTS } from "../../homeConstants";
import MinistryCard from "../MinistryCard";
import SectionWrapper from "../SectionWrapper";

const { MINISTRIES_HEADER, imageRootSx, cardContainerSx } = HOME_CONSTANTS;
const PageMinistries: FC = () => {
	const { isLoading, data } = useQuery<MinistriesDT[]>({
		queryKey: ["get-ministries"],
		queryFn: async () => await getDatabaseList("ministries"),
		staleTime: 10 * 60 * 1000, // 10 minutes
		gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
		// Show stale data while refetching to avoid loading screen flash
		placeholderData: (previousData) => previousData,
		// Retry failed requests with exponential backoff
		retry: 2,
		retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
	});

	return (
		<SectionWrapper header={MINISTRIES_HEADER}>
			<Stack direction={{ xs: "column", md: "row" }} sx={cardContainerSx}>
				{!isLoading &&
					data?.map((i) => (
						<MinistryCard
							{...{
								header: { title: i.title },
								content: i.content,
								link: i.link_url,
								image: {
									root: {
										sx: imageRootSx,
									},
									image: {
										src: i.image_url,
										alt: `${i.title} image`,
									},
								},
							}}
							key={`${i.title} image`}
						/>
					))}
				{isLoading && <RingLoader />}
			</Stack>
		</SectionWrapper>
	);
};

export default PageMinistries;
