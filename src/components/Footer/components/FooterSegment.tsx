import {
	type FooterSegmentProps,
	FooterSegmentSkeleton,
} from "@components/Footer";
import type { Theme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Col, Collapse, Flex, Typography, theme } from "antd";
import type { CSSProperties, FC, PropsWithChildren } from "react";

const contentSx: CSSProperties = {
	gap: 1,
	paddingBottom: '8px',
};

const titleStyle: CSSProperties = {
	fontWeight: 'bold',
	fontFamily: 'inter',
	marginTop: 0,
	marginBottom: 0,
}

type LabelProps = {
	title: string;
	subtitle?: string;
	color?: CSSProperties["color"];
}


const LabelComponent: FC<LabelProps> = ({ title, subtitle, color }) => (
	<>
		<Typography.Title level={5} style={{ ...titleStyle, color }}>
			{title}
		</Typography.Title>
		{subtitle && (
			<Typography.Text style={{ color }}>
				{subtitle}
			</Typography.Text>
		)}
	</>
);

const ContentComponent: FC<PropsWithChildren<{ style: CSSProperties }>> = ({ children, style }) => (
	<Flex vertical style={{ ...contentSx, ...style }}>{children}</Flex>
)

const ComponentContent: FC<Omit<FooterSegmentProps, "isLoading">> = ({
	title,
	subtitle,
	children,
}) => {

	const { token } = theme.useToken();
	const isMobile = useMediaQuery((theme: Theme) =>
		theme.breakpoints.down("md"),
	);

	return (
		<>
			{isMobile ? (
				<>
					<Collapse
						accordion
						bordered={false}
						size={"small"}
						ghost
						style={{
							color: 'inherit',
						}}
						styles={{
							header: {
								alignItems: "center",
								color: 'inherit',
							},
							icon: {
								color: token.colorPrimaryText,
							}
						}}
						items={[
							{
								key: title,
								label: (
									<Flex vertical style={{ color: "white !important" }}>
										<LabelComponent {...{
											title,
											subtitle,
											color: token.colorPrimaryText
										}} />
									</Flex>
								),
								children: <ContentComponent {...{
									children,
									style: {
										color: token.colorPrimaryText,
										paddingLeft: '24px',
									}
								}} />
							}
						]} />
				</>
			) : (
				<>
					<LabelComponent {...{
						title,
						subtitle,
						color: token.colorPrimaryText
					}} />
					<ContentComponent {...{
						children,
						style: {
							color: token.colorPrimaryText,
							paddingTop: '12px',
							paddingLeft: '16px',
						}
					}} />
				</>
			)}
		</>
	);
};

const FooterSegment: FC<FooterSegmentProps> = ({
	children,
	subtitle,
	title,
	isLoading = false,
}) => (
	<Col
		xs={{ flex: '100%' }}
		sm={{ flex: "50%" }}
		lg={{ flex: "25%" }}

	>
		{isLoading ? (
			<FooterSegmentSkeleton />
		) : (
			<ComponentContent {...{ title, subtitle, children }} />
		)}
	</Col>
);

export default FooterSegment;
