import type { ServiceDT } from "@/api";
import { useEntityList } from "@hooks/api";
import {
	CONTACT_CONSTANT,
	ContactSection,
	ContactSectionSkeleton,
} from "@pages/Contact";
import { NoteSection } from "@pages/Home";
import dayjs from "dayjs";
import type { FC } from "react";

const ServiceTimes: FC = () => {
	const { data, error, isLoading } = useEntityList<ServiceDT>("services");

	return (
		<>
			{!isLoading && !error && (
				<ContactSection title={CONTACT_CONSTANT.SERVICES}>
					{data?.map((i) => (
						<NoteSection
							content={dayjs(i.time).isValid() ? dayjs(i.time).format('h:mm a') : i.time}
							key={i.title}
							title={`${i.title}:`}
						/>
					))}
				</ContactSection>
			)}
			{isLoading && <ContactSectionSkeleton />}
		</>
	);
};

export default ServiceTimes;
