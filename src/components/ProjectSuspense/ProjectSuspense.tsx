import { type FC, Suspense, type SuspenseProps } from "react";
import RingLoader from "react-spinners/RingLoader";

const ProjectSuspense: FC<SuspenseProps> = ({ children, ...rest }) => {
	return (
		<Suspense fallback={<RingLoader />} {...rest}>
			{children}
		</Suspense>
	);
};

export default ProjectSuspense;
