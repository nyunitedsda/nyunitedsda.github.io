import type { FC } from "react";
import type { StreamWrapperProps } from "./types";

const StreamWrapper: FC<StreamWrapperProps> = (props) => {
  const { children } = props;
  return (
    <>
      {children}
    </>
  );
};

export default StreamWrapper;