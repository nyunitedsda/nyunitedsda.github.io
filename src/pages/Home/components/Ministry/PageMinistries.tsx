import RingLoader from "@components/Loaders";
import Stack from "@mui/material/Stack";
import { HOME_CONSTANTS, MinistryCard, SectionWrapper } from "@pages/Home";
import type { FC } from "react";
import { useLoaderData } from "react-router-dom";
import type { MinistriesDT } from "@/api";

const PageMinistries: FC = () => {
	const { ministries, isLoading } = useLoaderData();

	return (
		<SectionWrapper header={HOME_CONSTANTS.MINISTRIES_HEADER}>
			<Stack
				direction={{ xs: "column", md: "row" }}
				sx={HOME_CONSTANTS.cardContainerSx}
			>
				{!isLoading &&
					ministries?.map((i: MinistriesDT) => (
						<MinistryCard
							{...{
								header: { title: i.title },
								content: i.content,
								link: i.link_url,
								image: {
									src: i.image_url,
									alt: `${i.title} image`,
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
