import { type FC, type ReactNode, useMemo } from "react";
import { useLoaderData } from "react-router";
import { CONTACT_CONSTANT } from "../../../pages/Contact/components/contact";
import NoteSection from "../../../pages/Home/components/AnnouncementCard/NoteSection";
import { formatFooterContactData } from "../helpers";
import FooterSegment from "./FooterSegment";
import FooterSegmentSkeleton from "./FooterSegmentSkeleton";

const FooterContact: FC<{ iconMap: Record<string, ReactNode> }> = ({
	iconMap,
}) => {
	const { defaultContact: data, isLoading } = useLoaderData();

	const contactData = useMemo(() => {
		return data ? formatFooterContactData(data) : [];
	}, [data]);
	return (
		<FooterSegment title={CONTACT_CONSTANT.CONTACT_US}>
			{isLoading || !contactData ? (
				<FooterSegmentSkeleton />
			) : (
				contactData.map((i) => (
					<NoteSection
						{...i}
						columnLayout
						content={i.content}
						icon={i?.icon ? iconMap[i.icon] : undefined}
						key={i.content}
					/>
				))
			)}
		</FooterSegment>
	);
};

export default FooterContact;
