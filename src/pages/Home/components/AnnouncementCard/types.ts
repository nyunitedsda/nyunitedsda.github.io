import type { ReactNode } from "react";
import type { EventAnnouncement } from "../../types";

type AnnouncementCardProps = EventAnnouncement & {
	className?: string;
};

interface NoteSectionProps {
	icon?: ReactNode;
	content: ReactNode;
	title?: string;
	columnLayout?: boolean;
}

export type { AnnouncementCardProps, NoteSectionProps };
