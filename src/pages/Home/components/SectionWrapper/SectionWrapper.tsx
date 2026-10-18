import type { SectionWrapperProps } from "@pages/Home";
import { Flex, theme, Typography } from "antd";
import { type CSSProperties, type FC, memo } from "react";

const headerSx: CSSProperties = {
	fontFamily: "inter",
	fontWeight: "bold",
	textAlign: "center",
	width: "100%",
};

const SectionWrapper: FC<SectionWrapperProps> = ({
	children,
	header,
}) => {
	const { token } = theme.useToken();
	return (
		<Flex vertical >
			{header && (
				<Typography.Title
					level={2}
					style={{ ...headerSx, color: token.colorPrimary }}
				>
					{header}
				</Typography.Title>
			)}
			{children}
		</Flex>
	);
};

export default memo(SectionWrapper);
