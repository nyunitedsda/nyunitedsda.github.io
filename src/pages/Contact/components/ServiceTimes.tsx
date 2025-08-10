import { useEntityList } from "@hooks/api";
import type { FC } from "react";
import type { ServiceDT } from "@/api";
import NoteSection from "../../Home/components/AnnouncementCard/NoteSection";
import ContactSection from "./ContactSection";
import ContactSectionSkeleton from "./ContactSectionSkeleton";
import { CONTACT_CONSTANT } from "./contact";

const ServiceTimes: FC = () => {
	const { data, error, isLoading } = useEntityList<ServiceDT>("services");

	return (
		<>
			{!isLoading && !error && (
				<ContactSection title={CONTACT_CONSTANT.SERVICES}>
					{data?.map((i) => (
						<NoteSection content={i.time} key={i.title} title={`${i.title}:`} />
					))}
				</ContactSection>
			)}
			{isLoading && <ContactSectionSkeleton />}
		</>
	);
};

export default ServiceTimes;
