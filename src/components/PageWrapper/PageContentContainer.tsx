import Container, { type ContainerProps } from '@mui/material/Container';
import { type FC } from 'react';

const PageContentContainer: FC<Omit<ContainerProps, "MaxWidth">> = ({
  children,
  ...rest
}) => {

  return (
    <Container
      maxWidth="lg"
      {...rest}
    >
      {children}
    </Container>
  );
};

export default PageContentContainer;