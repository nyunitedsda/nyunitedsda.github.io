import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { SxProps, Theme } from '@mui/material/styles';
import type { FC, PropsWithChildren } from 'react';
import type { PageWrapperProps } from './types';
import Footer from '../Footer/Footer';

const headerSx: SxProps<Theme> = {
  mb: 2,
  fontWeight: "bold",
  color: "primary.main"
}
const rootSx: SxProps<Theme> = {
  mt: 8,
  mb: 8,
  flexGrow: 1
}
const subHeaderSx: SxProps<Theme> = {
  mb: 2,
  fontWeight: 'bold'
}


const PageWrapper: FC<PropsWithChildren<PageWrapperProps>> = (props) => {
  const { header, subHeader, children } = props;

  return (
    <Stack>
    <Container maxWidth="lg" sx={rootSx}>
      <Typography variant="h3" component="h1" sx={headerSx}>
        {header}
      </Typography>
      {subHeader && (
        <Typography variant="h6" sx={subHeaderSx}>
          {subHeader}
        </Typography>
      )}
      <Stack>
        {children}
      </Stack>
    </Container>

      <Footer/>
    </Stack>
  );
};

export default PageWrapper;
