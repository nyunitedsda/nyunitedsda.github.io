import { Grid, Stack, type SxProps, type Theme } from "@mui/material";
import { useEffect, type FC } from "react";
import { useRoutes } from "react-router";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import routes from "./constants/routes";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const rootSx: SxProps<Theme> = {
  width: "100%",
  height: "100%",
  overflowX: "hidden",
  overflowY: "auto",
}

const HEADER_SIZE = 68.5;
const FOOTER_SIZE = 250;

const App: FC = () => {
  const element = useRoutes(routes);

  useEffect(() => {
    
  }, []);
  return (
    <Grid
      container
      sx={rootSx}
    >
      <Header />
      <Stack
        direction={'column'}
        sx={{
          flexGrow: 1,
          minHeight: `calc(100vh - ${HEADER_SIZE + FOOTER_SIZE}px)`,
          height: '100%',
          width: "100%",
        }}
      >
        {element}
      </Stack>

      <Footer />
    </Grid>
  );
};

export default App;
