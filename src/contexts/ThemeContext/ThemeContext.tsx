import { ConfigProvider, theme } from 'antd';
import React, { type PropsWithChildren, useEffect, useMemo, useState } from 'react';
import { antDTheme } from '@/components/AppProvider';
import context from './context';
import type { Mode } from './types';

const getInitialMode = (): Mode => {
  const saved = localStorage.getItem('theme-mode') as Mode | null;
  if (saved) return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};



const ThemeContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [mode, setMode] = useState<Mode>(getInitialMode);

  useEffect(() => {
    localStorage.setItem('theme-mode', mode);
    // Useful for your own CSS / body background
    document.documentElement.setAttribute('data-theme', mode);
  }, [mode]);

  const value = useMemo(
    () => ({ mode, toggleMode: () => setMode((m) => (m === 'dark' ? 'light' : 'dark')) }),
    [mode]
  )

  return (
    <context.Provider value={value}
    >
      <ConfigProvider theme={{
        ...antDTheme,
        algorithm: mode === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}>
        {children}
      </ConfigProvider>
    </context.Provider>
  )
}



export default ThemeContextProvider;