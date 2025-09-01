type AdministrationTab = "users" | "donations" | "notifications";

interface AdministrationProps {
	initialTab?: string;
}

export type { AdministrationProps, AdministrationTab };
