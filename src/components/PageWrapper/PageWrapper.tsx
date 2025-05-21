import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { SxProps, Theme } from '@mui/material/styles';
import type { FC, PropsWithChildren } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import type { PageWrapperProps } from './types';

const headerSx: SxProps<Theme> = {
  fontWeight: "bold",
  color: "primary.main"
}
const containerSx: SxProps<Theme> = {
  pt: 8,
  pb: 4,
  flexGrow: 1,
  display: 'flex',
  flexDirection: "column",
  justifyContent: 'flex-start'
}
const subHeaderSx: SxProps<Theme> = {
  fontWeight: 'bold'
}

const rootSx: SxProps<Theme> = {
  width: '100%',
  minHeight: '100%',
}

const PageWrapper: FC<PropsWithChildren<PageWrapperProps>> = (props) => {
  const { header, subHeader, children } = props;

  return (
    <Stack sx={rootSx}>
      <Header />
      <Container maxWidth="lg" sx={containerSx}>
        {
          (header || subHeader) && (
            <Stack spacing={2} sx={{ pb: 2 }} className='fade-in'>
              {
                header && (
                  <Typography variant="h3" component="h1" sx={headerSx}>
                    {header}
                  </Typography>
                )
              }
              {subHeader && (
                <Typography variant="h6" sx={subHeaderSx}>
                  {subHeader}
                </Typography>
              )}
            </Stack>
          )
        }
        <Stack sx={{ flexGrow: 1 }}>
          {children}
        </Stack>
      </Container>

      <Footer />
    </Stack>
  );
};

export default PageWrapper;
