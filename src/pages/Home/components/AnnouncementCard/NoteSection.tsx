import type { NoteSectionProps } from "@pages/Home";
import { Flex, Typography } from "antd";
import { type CSSProperties, type FC, memo } from "react";

const noteSx: CSSProperties = {
	display: "flex",
	alignItems: "center",
	gap: '12px',
};

const contentSx: CSSProperties = { display: "flex", rowGap: 0, columnGap: 2 };

const NoteSection: FC<NoteSectionProps> = ({
	icon,
	content,
	title,
	columnLayout = false,
}) => (
	<Flex style={noteSx}>
		{icon && icon}
		<Flex style={{ ...contentSx, flexDirection: columnLayout ? "column" : "row", columnGap: '12px' }}>
			{title && (
				<Typography.Text style={{ fontWeight: 'bold' }}>
					{title}
				</Typography.Text>
			)}
			{content && (
				<Typography.Text color="text.primary" >
					{content}
				</Typography.Text>
			)}
		</Flex>
	</Flex>
);

export default memo(NoteSection);
