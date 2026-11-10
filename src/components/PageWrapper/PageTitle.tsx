import { PlusOutlined } from "@ant-design/icons";
import type { PageTitleProps } from "@components/PageWrapper";
import { type Theme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Button, Flex, FloatButton, theme } from "antd";
import Title from "antd/es/typography/Title";
import { type CSSProperties, type FC, useMemo } from "react";

const titleSx: CSSProperties = {
	fontFamily: "inter",
	fontWeight: "bold",
	marginTop: "0px",
};

const subtitleSx: CSSProperties = {
	fontWeight: "bold",
	margin: "0px",
};

const rootStyle: CSSProperties = {
	alignItems: "center",
	gap: "24px",
	justifyContent: "space-between",
	padding: "16px 0px",
};

const MOBILE_BUTTON_OFFSET = 18;

const PageTitle: FC<PageTitleProps> = ({
	subtitle,
	title,
	handleClick,
	icon,
}) => {
	const {token} = theme.useToken();

	const isMobile = useMediaQuery((theme: Theme) =>
		theme.breakpoints.down("sm"),
	);

	const buttonStyle = useMemo(
		() => ({
			color: token.colorPrimaryText,
			backgroundColor: token.colorPrimary,
		}),
		[token],
	);

	return (
		<Flex vertical={false} style={rootStyle}>
			<Flex style={{ flexGrow: 1, flexDirection: "column" }}>
				<Title
					level={2}
					style={{ ...titleSx, color: token.colorPrimary }}
				>
					{title}
				</Title>
				{subtitle && (
					<Title level={4} style={{ ...subtitleSx, color: token.colorTextSecondary}} type={"secondary"}>
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
						color: "lightgrey",
					}}
				/>
			)}
		</Flex>
	);
};

export default PageTitle;
