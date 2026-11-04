import {
	FooterSegment,
	FooterSegmentSkeleton,
	formatFooterContactData,
} from "@components/Footer";
import { CONTACT_CONSTANT } from "@pages/Contact";
import { NoteSection } from "@pages/Home";
import { theme } from "antd";
import { type FC, type ReactNode, useMemo } from "react";
import { useLoaderData } from "react-router";

interface FCProps {
	iconMap: Record<string, ReactNode>;
}

const FooterContact: FC<FCProps> = ({ iconMap }) => {
	const { defaultContact: data, isLoading } = useLoaderData();
	const {token} = theme.useToken();

	const contactData = useMemo(() => {
		return data ? formatFooterContactData(data) : [];
	}, [data]);
	return (
		<FooterSegment title={CONTACT_CONSTANT.CONTACT_US}>
			{isLoading || !contactData ? (
				<FooterSegmentSkeleton />
			) : (
				contactData.map((i) => (
					<NoteSection
						{...i}
						columnLayout
						content={i.content}
						icon={i?.icon ? iconMap[i.icon] : undefined}
						key={i.content}
						style={{color: token.colorPrimaryText}}
					/>
				))
			)}
		</FooterSegment>
	);
};

export default FooterContact;
