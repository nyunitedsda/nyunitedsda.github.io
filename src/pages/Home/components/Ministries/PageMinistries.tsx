import Stack from "@mui/material/Stack";
import type { FC } from "react";
import { useLoaderData } from "react-router-dom";
import type { MinistriesDT } from "../../../../api/request";
import RingLoader from "../../../../components/Loaders/RingLoader";
import { HOME_CONSTANTS } from "../../homeConstants";
import MinistryCard from "../MinistryCard";
import SectionWrapper from "../SectionWrapper";

const { MINISTRIES_HEADER, imageRootSx, cardContainerSx } = HOME_CONSTANTS;
const PageMinistries: FC = () => {
	const { ministries, isLoading } = useLoaderData();

	return (
		<SectionWrapper header={MINISTRIES_HEADER}>
			<Stack direction={{ xs: "column", md: "row" }} sx={cardContainerSx}>
				{!isLoading &&
					ministries?.map((i: MinistriesDT) => (
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
