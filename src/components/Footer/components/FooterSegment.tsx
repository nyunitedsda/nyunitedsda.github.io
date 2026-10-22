import {
	type FooterSegmentProps,
	FooterSegmentSkeleton,
} from "@components/Footer";
import type { Theme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Col, Collapse, Flex, Typography } from "antd";
import type { CSSProperties, FC } from "react";

const contentSx: CSSProperties = {
	color: "white",
	gap: 1,
	paddingLeft: '16px',
	paddingTop: '16px',
	paddingBottom: '8px',
};

const titleStyle: CSSProperties = {
	fontWeight: 'bold',
	fontFamily: 'inter',
	marginTop: 0,
	marginBottom: 0,
	color: "white"
}

const ComponentContent: FC<Omit<FooterSegmentProps, "isLoading">> = ({
	title,
	subtitle,
	children,
}) => {

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
						style={{
							background: 'transparent'
						}}
						styles={{
							header: {
								alignItems: "center",
							}
						}}
						items={[
							{
								key: title,
								label: (
									<Flex vertical style={{ color: "white !important"}}>
										<Typography.Title level={5} style={titleStyle}>
											{title}
										</Typography.Title>
										{subtitle && (
											<Typography.Text>
												{subtitle}
											</Typography.Text>
										)}
									</Flex>
								),
								children: (<Flex vertical style={contentSx}>{children}</Flex>)
							}
						]} />
				</>
			) : (
				<>
					<Typography.Title level={5} style={titleStyle} >
						{title}
					</Typography.Title>
					{subtitle && (
						<Typography.Text>
							{subtitle}
						</Typography.Text>
					)}
					<Flex vertical style={{ ...contentSx, paddingLeft: '4px' }}>{children}</Flex>
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
