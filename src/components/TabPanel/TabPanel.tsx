import RingLoader from "@components/Loaders";
import type { TabPanelProps } from "@components/TabPanel";
import type { FC } from "react";

const TabPanel: FC<TabPanelProps> = (props) => {
	const { children, index, value } = props;

	return (
		<>
			{(!value || !index) && <RingLoader />}
			{value === index && children}
		</>
	);
};

export default TabPanel;
