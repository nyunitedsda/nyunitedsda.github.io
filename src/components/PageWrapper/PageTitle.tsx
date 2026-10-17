import type { PageTitleProps } from "@components/PageWrapper";
import { useTheme, type Theme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { type CSSProperties, type FC, useMemo } from "react";
import { Flex, Button, FloatButton } from 'antd';
import Title from "antd/es/typography/Title";
import { PlusOutlined } from "@ant-design/icons";

const titleSx: CSSProperties = {
	color: "primary.light",
	fontFamily: "inter",
	fontWeight: "bold",
	marginTop: '0px',
};

const subtitleSx: CSSProperties = {
	color: "text.primary",
	fontWeight: "bold",
	margin: '0px',
};

const rootStyle: CSSProperties = {
	alignItems: 'center',
	gap: '24px',
	justifyContent: "space-between",
	padding: '16px 0px',
}

const MOBILE_BUTTON_OFFSET = 18;

const PageTitle: FC<PageTitleProps> = ({
	subtitle,
	title,
	handleClick,
	icon,
}) => {

	const theme = useTheme();

	const isMobile = useMediaQuery((theme: Theme) =>
		theme.breakpoints.down("sm"),
	);

	const buttonStyle = useMemo(
		() => ({
			color: theme.palette.primary.contrastText,
			backgroundColor: theme.palette.primary.light
		}),
		[theme],
	);

	return (
		<Flex vertical={false} style={rootStyle}>
			<Flex style={{ flexGrow: 1, flexDirection: 'column' }} >
				<Title level={2} style={{ ...titleSx, color: theme.palette.primary.light }}>
					{title}
				</Title>
				{subtitle && (
					<Title level={4} style={subtitleSx} type={'secondary'}>
						{subtitle}
					</Title>
				)}
			</Flex>
			{!isMobile && handleClick && (
				<Button
					aria-label={`Create new ${title}`}
					icon={icon ?? <PlusOutlined />}
					onClick={handleClick}
					shape={"round"}
					style={buttonStyle}
					type={"primary"}
					>
					{"Create"}
				</Button>
			)}
			{isMobile && handleClick && (
				<FloatButton
					icon={icon ?? <PlusOutlined />}
					onClick={handleClick}
					shape={"circle"}
					style={{ insetInlineEnd: MOBILE_BUTTON_OFFSET, ...buttonStyle }}
					tooltip={{
						title: "Create",
						color: 'lightgrey'
					}}
				/>
			)}
		</Flex>
	);
};

export default PageTitle;
