import ChevronRight from '@mui/icons-material/ChevronRight';
import Login from '@mui/icons-material/Login';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { SxProps, Theme } from '@mui/material/styles';
import { memo, type FC } from 'react';
import type { MenuDrawerProps } from './types';

const rootSx: SxProps<Theme> = {
  textAlign: "center",
  width: 250,
  height: '100%',
  p: 1,
  pt: 0
}

const MenuDrawer: FC<MenuDrawerProps> = ({ isActive, toggleDrawer, title, menuItems }) => {

  return (
    <Stack onClick={toggleDrawer} sx={rootSx}
    >
      <Stack sx={{
        height: theme => `${theme.spacing(8)}`,
        borderBottom: theme => `1px solid ${theme.palette.divider}`,
        justifyContent: 'center'
      }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", color: "primary.main" }}
        >
          {title}
        </Typography>
      </Stack>
      <List>
        {menuItems.map((item) => (
          <ListItem
            key={item.name}
            component={"a"}
            href={item.path}
            sx={{
              color: isActive(item.path) ? "primary.main" : "text.primary",
              bgcolor: isActive(item.path) ? "action.selected" : "transparent",
              "&:hover": { bgcolor: "action.hover" },
            }}
          >
            <Box sx={{ mr: 2 }}>{item.icon}</Box>
            <ListItemText primary={item.name} />
            {isActive(item.path) && <ChevronRight />}
          </ListItem>
        ))}
        <ListItem
          component={"a"}
          href="/login"
          sx={{
            color: isActive("/login") ? "primary.main" : "text.primary",
            bgcolor: isActive("/login") ? "action.selected" : "transparent",
            "&:hover": { bgcolor: "action.hover" },
          }}
        >
          <Box sx={{ mr: 2 }}>
            <Login />
          </Box>
          <ListItemText primary="Login" />
          {isActive("/login") && <ChevronRight />}
        </ListItem>
      </List>
    </Stack>
  );

};

export default memo(MenuDrawer);