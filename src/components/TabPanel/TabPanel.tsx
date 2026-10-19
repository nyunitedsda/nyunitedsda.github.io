import RingLoader from "@components/Loaders";
import type { TabPanelProps } from "@components/TabPanel";
import type { FC } from "react";

const TabPanel: FC<TabPanelProps> = (props) => {
	const { children, index, value } = props;

	return (
		<>
			{(!value || !index) && <RingLoader />}
			{value === index && (
				// <Flex
				// 	vertical
				// 	// {...other}
				// 	aria-labelledby={`full-width-tab-${index}`}
				// 	hidden={value !== index}
				// 	id={`full-width-tabpanel-${index}`}
				// 	// sx={[rootSx, ...(sx ? (Array.isArray(sx) ? sx : [sx]) : [])]}
				// 	role="tabpanel"
				// >
					// {children}
					children
				// </Flex>
			)}
		</>
	);
};

export default TabPanel;
