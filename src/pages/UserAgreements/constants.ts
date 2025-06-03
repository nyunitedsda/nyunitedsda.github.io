import type { RouteTabsItem } from "../../components/RoutedTabs/types";
import privacyStatement from "./privacyStatement";
import termsOfUse from "./termsOfUse";

export const LEGAL_TAB_LIST: RouteTabsItem[] = [
	{ id: 1, tag: "termsOfUse", label: "Terms Of Use", content: termsOfUse },
	{
		id: 2,
		tag: "privacy",
		label: "Privacy Statement",
		content: privacyStatement,
	},
];