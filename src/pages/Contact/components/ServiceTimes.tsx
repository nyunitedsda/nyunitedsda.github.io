import { useEntityList } from "@hooks/api";
import {
	CONTACT_CONSTANT,
	ContactSection,
	ContactSectionSkeleton,
} from "@pages/Contact";
import { NoteSection } from "@pages/Home";
import type { FC } from "react";
import type { ServiceDT } from "@/api";

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
