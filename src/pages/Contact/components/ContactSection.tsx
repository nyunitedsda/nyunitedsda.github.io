import { useTheme } from "@mui/system";
import { Flex } from "antd";
import Title from "antd/es/typography/Title";
import type { CSSProperties, FC, PropsWithChildren } from "react";

const ContactSection: FC<
	PropsWithChildren<{ title: string; sx?: CSSProperties }>
> = ({ children, title, sx }) => {
	const theme = useTheme();

	return (
		<Flex vertical style={sx}>
			<Title level={4} style={{ color: theme.palette.primary.light, fontWeight: 'bold' }}>
				{title}
			</Title>
			<Flex vertical style={{ paddingLeft: '8px', gap: 1 }}>{children}</Flex>
		</Flex>
	)
};

export default ContactSection;
