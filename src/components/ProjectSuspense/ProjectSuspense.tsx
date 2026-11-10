import { Spin } from "antd";
import { type FC, Suspense, type SuspenseProps } from "react";

const ProjectSuspense: FC<SuspenseProps> = ({ children, ...rest }) => {
	return (
		<Suspense fallback={<Spin spinning />} {...rest}>
			{children}
		</Suspense>
	);
};

export default ProjectSuspense;
