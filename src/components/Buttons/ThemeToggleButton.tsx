import { DarkModeRounded, LightModeRounded } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import { useColorScheme } from '@mui/material/styles';
import { type FC, useCallback, useMemo } from 'react';
// import { useTranslation } from 'react-i18next';

const ThemeToggleButton: FC = () => {
  const { mode, setMode } = useColorScheme();
  // const { t } = useTranslation(['translation']);

  const toggledMode = useMemo(
    () => (mode === 'light' ? 'dark' : 'light'),
    [mode],
  );

  const _handleBtnClick = useCallback<() => void>(() => {
    setMode(toggledMode);
  }, [setMode, toggledMode]);

  if (!mode) {
    return null;
  }

  return (
    <IconButton
      onClick={_handleBtnClick}
      title={`Switch to ${ toggledMode }`}
    >
      {mode === 'dark' ? (
        <LightModeRounded color="warning" />
      ) : (
        <DarkModeRounded
          sx={{ color: (theme) => theme.palette.primary.main }}
        />
      )}
    </IconButton>
  );
};

export default ThemeToggleButton;