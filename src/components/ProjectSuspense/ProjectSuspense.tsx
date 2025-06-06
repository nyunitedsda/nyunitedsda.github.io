import { type FC, Suspense, type SuspenseProps } from "react";
import RingLoader from "react-spinners/RingLoader";

const ProjectSuspense: FC<Omit<SuspenseProps, "fallback">> = ({
	children,
	...rest
}) => {
	return (
		<Suspense fallback={<RingLoader />} {...rest}>
			{children}
		</Suspense>
	);
};

export default ProjectSuspense;
