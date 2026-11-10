import { Flex, Spin } from "antd";
import type { CSSProperties, FC } from "react";

const rootSx: CSSProperties = {
	height: "100%",
	width: "100%",
	justifyContent: "center",
	alignItems: "center",
	backgroundColor: "inherit",
};

const RingLoader: FC = () => {
	return (
		<Flex style={rootSx}>
			<Spin spinning size={"large"} />
		</Flex>
	);
};

export default RingLoader;
