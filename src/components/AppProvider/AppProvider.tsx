import { CssBaseline, ThemeProvider } from '@mui/material';
import { type FC, type PropsWithChildren, StrictMode } from 'react';
import theme from './theme';

const AppProvider: FC<PropsWithChildren> = ({ children }) => {

  return (
    <StrictMode>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </StrictMode>
  );
};

export default AppProvider;
