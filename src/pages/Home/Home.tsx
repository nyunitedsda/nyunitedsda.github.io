import {
	PageAnnouncements,
	PageMinistries,
	sliderImages,
} from "@pages/Home";
import { Carousel, Flex, theme, Image } from "antd";
import type { FC } from "react";

const Home: FC = () => {
	const { token } = theme.useToken();
	return (
		<Flex vertical style={{ margin: "0px auto", maxWidth: token.screenXL }}>
			{/* Image Slides */}

			<Image.PreviewGroup items={sliderImages.map((i) => i.src)} >
				<Carousel arrows adaptiveHeight
					style={{ borderRadius: '40px !important' }}>
					{sliderImages.map((i) => (
						<Image
							width={'100%'}
							key={i.src}
							src={i.src}
							alt={i.alt ?? `${i.src}-image`}

							style={{ borderRadius: '80px' }}
						/>
					))}
				</Carousel>
			</Image.PreviewGroup>

			{/* Notification Slides */}
			<PageAnnouncements />

			{/* Ministries content */}
			<PageMinistries />
		</Flex>
	);
};

export default Home;
