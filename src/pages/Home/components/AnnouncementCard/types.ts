import type { ReactNode } from "react";
import type { AnnouncementDT } from "@/api";

type AnnouncementCardProps = AnnouncementDT & {
	className?: string;
};

interface NoteSectionProps {
	icon?: ReactNode;
	content: ReactNode;
	title?: ReactNode;
	columnLayout?: boolean;
}

export type { AnnouncementCardProps, NoteSectionProps };
