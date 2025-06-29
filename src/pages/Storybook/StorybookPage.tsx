import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type { SxProps, Theme } from "@mui/material/styles";
import { lazy, Suspense, type FC } from "react";
import RingLoader from "../../components/Loaders/RingLoader";

const StorybookIframe = lazy(() => import("./StorybookIframe.tsx"));

const rootSx: SxProps<Theme> = { 
  width: "100%", 
  height: "100%", 
  p: 2,
}

const SUBTITLE = "Browse through our component library to see all available components and their variations."
const TITLE = "Component Library";
const contentSx: SxProps<Theme> = { 
  width: "100%", 
  height: "calc(100vh - 200px)", 
  mt: 3, 
}

const StorybookPage: FC = () => {
  return (
    <Box sx={rootSx}>
      <Typography variant="h4" component="h1" gutterBottom>
        {TITLE}
      </Typography>
      <Typography variant="body1">
        {SUBTITLE}
      </Typography>
      <Box sx={contentSx}>
        <Suspense fallback={<RingLoader /> }>
          <StorybookIframe />
        </Suspense>
      </Box>
    </Box>
  );
};

export default StorybookPage;
