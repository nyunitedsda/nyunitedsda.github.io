import siteRoutes from "../../hooks/routes/siteRoutes";
import privacyStatement from "./privacyStatement";
import termsOfUse from "./termsOfUse";

interface TermsAndPoliciesItem {
	id: number;
	tag: string;
	label: string;
	content: string;
	href?: string;
}

const getTermsAndPolicies = () => {
	return [
		{ id: 1, tag: "termsOfUse", label: "Terms Of Use", content: termsOfUse },
		{
			id: 2,
			tag: "privacy",
			label: "Privacy Statement",
			content: privacyStatement,
		},
	]
		.map((x): TermsAndPoliciesItem | undefined => {
			const route = siteRoutes.find((i) => i.path?.includes(x.tag));
			return route ? { ...x, href: route.path } : undefined;
		})
		.filter(
			(x): x is TermsAndPoliciesItem => x !== undefined && x.href !== undefined,
		);
};

export { getTermsAndPolicies };
