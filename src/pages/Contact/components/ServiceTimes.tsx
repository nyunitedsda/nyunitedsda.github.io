import { useQuery } from "@tanstack/react-query";
import type { FC } from "react";
import type { ServiceDT } from "../../../api/request";
import { getDatabaseList } from "../../../api/request/commonQueries";
import NoteSection from "../../Home/components/AnnouncementCard/NoteSection";
import ContactSection from "./ContactSection";
import ContactSectionSkeleton from "./ContactSectionSkeleton";
import { CONTACT_CONSTANT } from "./contact";

const ServiceTimes: FC = () => {
	const { data, isLoading, error } = useQuery<ServiceDT[]>({
		queryKey: ["services"],
		queryFn: async () => getDatabaseList("services"),
	});

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
