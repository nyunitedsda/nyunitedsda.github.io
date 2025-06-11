import type { FC } from "react";
import services from "../../../constants/services";
import NoteSection from "../../Home/components/AnnouncementCard/NoteSection";
import { SERVICES } from "../constants";
import ContactSection from "./ContactSection";

const ServiceTimes: FC = () => {
	return (
		<ContactSection title={SERVICES}>
			{services.map((i) => (
				<NoteSection content={i.time} key={i.title} title={`${i.title}:`} />
			))}
		</ContactSection>
	);
};

export default ServiceTimes;
