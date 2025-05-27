import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { type FC, memo } from "react";
import type { TabPanelProps } from "./types";

const TabPanel: FC<TabPanelProps> = (props) => {
  const { children, enableStack, index, stackProps, value, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        enableStack ? (
          <Stack {...stackProps}> {children} </Stack>
        ) : (
          <>{children}</>
        )
      )}
    </Box>
  );
};

export default memo(TabPanel);
