import Skeleton from "@mui/material/Skeleton";
import type { FC } from "react";
import ContactSection from "./ContactSection";
import { CONTACT_CONSTANT } from "./contact";

const ContactSectionSkeleton: FC = () => {
	return (
		<ContactSection title={CONTACT_CONSTANT.SERVICES}>
			{["top", "mid", "btm"].map((idx) => (
				<div key={`${idx}-name`} style={{ marginBottom: 16 }}>
					{/* Title Skeleton */}
					<div style={{ display: "flex", alignItems: "center" }}>
						<span style={{ marginRight: 8 }}>
							<Skeleton variant="text" width={80} height={28} />
						</span>
						<Skeleton variant="text" width={120} height={28} />
					</div>
					{/* Content Skeleton */}
					<Skeleton variant="rectangular" width="100%" height={24} />
				</div>
			))}
		</ContactSection>
	);
};

export default ContactSectionSkeleton;
