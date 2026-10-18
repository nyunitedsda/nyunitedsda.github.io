import RingLoader from "@components/Loaders";
import { HOME_CONSTANTS, MinistryCard, SectionWrapper } from "@pages/Home";
import type { FC } from "react";
import { useLoaderData } from "react-router-dom";
import type { MinistriesDT } from "@/api";
import { Row } from "antd";

const PageMinistries: FC = () => {
	const { ministries, isLoading } = useLoaderData();

	return (
		<SectionWrapper header={HOME_CONSTANTS.MINISTRIES_HEADER}>
			<Row
				justify={'center'}
				style={{gap: '24px'}}
				gutter={16}
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
			</Row>
		</SectionWrapper>
	);
};

export default PageMinistries;
