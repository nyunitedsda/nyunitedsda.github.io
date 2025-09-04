import Container, { type ContainerProps } from "@mui/material/Container";
import type { SxProps, Theme } from "@mui/material/styles";
import type { FC } from "react";

const rootSx: SxProps<Theme> = {
	position: "relative",
	height: "100%",
	// minHeight: "100dvh",
	// overflowY: 'auto',
};

const PageContentContainer: FC<Omit<ContainerProps, "MaxWidth">> = ({
	children,
	...rest
}) => {
	return (
		<Container id={"page-container"} maxWidth="lg" sx={rootSx} {...rest}>
			{children}
		</Container>
	);
};

export default PageContentContainer;
