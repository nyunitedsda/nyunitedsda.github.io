import Container, { type ContainerProps } from "@mui/material/Container";
import { type FC } from "react";

const PageContentContainer: FC<Omit<ContainerProps, "MaxWidth">> = ({
	children,
	...rest
}) => {
	return (
		<Container
			maxWidth="lg"
			sx={{ position: "relative", height: "100%", minHeight: "min-content" }}
			{...rest}
		>
			{children}
		</Container>
	);
};

export default PageContentContainer;
