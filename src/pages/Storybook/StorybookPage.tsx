import RingLoader from "@components/Loaders";
import React, { type FC, lazy } from "react";

const StorybookIframe = lazy(() => import("./StorybookIframe.tsx"));

const StorybookPage: FC = () => {
	return (
		<>
			<React.Suspense fallback={<RingLoader />}>
				<StorybookIframe />
			</React.Suspense>
		</>
	);
};

export default StorybookPage;
