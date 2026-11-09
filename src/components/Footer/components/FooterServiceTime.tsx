import { FooterSegment, FooterSegmentSkeleton } from "@components/Footer";
import { CONTACT_CONSTANT } from "@pages/Contact";
import { Typography, theme } from "antd";
import type { FC } from "react";
import { useLoaderData } from "react-router";
import type { ServiceDT } from "@/api";

const FooterServiceTime: FC = () => {
	const { services, isLoading } = useLoaderData();
	const { token } = theme.useToken();

	return (
		<FooterSegment isLoading={isLoading} title={CONTACT_CONSTANT.SERVICES}>
			{isLoading || !services ? (
				<FooterSegmentSkeleton />
			) : (
				services?.map((i: ServiceDT) => (
					<Typography.Text
						key={i.title}
						style={{
							color: token.colorPrimaryText,
						}}
					>
						<strong>{`${i.title}: `}</strong> {i.time}
					</Typography.Text>
				))
			)}
		</FooterSegment>
	);
};

export default FooterServiceTime;
