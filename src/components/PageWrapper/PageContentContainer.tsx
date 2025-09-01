import Container, { type ContainerProps } from "@mui/material/Container";
import type { SxProps, Theme } from "@mui/material/styles";
import type { FC } from "react";

const rootSx: SxProps<Theme> = {
	position: "relative",
	height: "100%",
	minHeight: "min-content",
};

const PageContentContainer: FC<Omit<ContainerProps, "MaxWidth">> = ({
	children,
	...rest
}) => {
	return (
		<Container maxWidth="lg" sx={rootSx} {...rest}>
			{children}
		</Container>
	);
};

export default PageContentContainer;
