import { Container, Grid, Stack, type SxProps, type Theme, Typography } from "@mui/material";
import { type FC } from "react";

import Slider from "react-slick";
import Image from '../../components/Image/Image';
import MinistryCard from "./components/MinistryCard";
import { ministries } from "./constants";
import sliderImages from "./sliderImages";

const imageRootSx: SxProps<Theme> = {
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  height: theme => `${theme.spacing(11)}`,
  p: 1,
}

const cardContainerSx: SxProps<Theme> = {
  alignItems: { xs: 'center', md: 'flex-start' },
  flexWrap: "wrap",
  gap: 2,
  width: "100%",
  '& .MuiPaper-root': {
    height: theme => `${theme.spacing(36)}`,
    maxWidth: { md: '32%' }
  },
  '& .MuiCardActions-root': {
    p: 0,
  },
}

const titleSx: SxProps<Theme> = {
  mb: 4,
  fontWeight: "bold",
  color: "primary.main",
  textAlign: 'center',
  width: '100%',
}

const MINISTRIES_HEADER = "Ministries Links";
const settings = {
  autoplay: true,
  autoplaySpeed: 7000,
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
}

const Home: FC = () => {


  return (
    <Container maxWidth="lg" sx={{ mb: 8, flexGrow: 1, gap: 2 }}>
      {/* <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 12 }}>
            <Typography
              variant="h4"
              component="h2"
              sx={{ mb: 4, fontWeight: "bold", color: "primary.main" }}
            >
              Latest Notifications
            </Typography>
            <Grid container spacing={3}>
              {notifications.map((notification, index) => (
                <Grid
                  size={12}
                  key={notification.id}
                  className="card-animation"
                >
                  <ProjectCard
                    header={{
                      title: notification.title,
                      subheader: new Date(
                        notification.date,
                      ).toLocaleDateString(),
                      avatar: <Notifications color="primary" />,
                    }}
                    content={
                      <Typography variant="body1">
                        {notification.content}
                      </Typography>
                    }
                    actions={
                      <Button size="small" color="primary">
                        Learn More
                      </Button>
                    }
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid> */}

      <Grid size={12} sx={{
        p: {xs: 0, md: 2},
        borderRadius: 1,
         height: { xs: theme => `${ theme.spacing(36)}`, md: theme => `${ theme.spacing(78)}`},
      }} >
        <Slider {...settings} >
          {
            sliderImages.map((i) => (
              <Image key={i.src} image={{
                src: i.src,
                alt: i.alt,
              }} root={{
                sx: {
                  height: {xs: theme => `${ theme.spacing(30)}`, md: theme => `${ theme.spacing(69)}`}, 
                  width: '100%',
                  // borderRadius: 1,                 
                  '& img': {
                    // borderRadius: 1,
                    width: '100%',
                    height: 'auto',
                    objectFit: 'cover !important'
                  }
                }
              }}/>
            ))
          }
        </Slider>
      </Grid>

      <Grid size={{ xs: 12 }}>
        <Typography
          variant="h4"
          component="h2"
          sx={titleSx}
        >
          {MINISTRIES_HEADER}
        </Typography>

        <Stack
          direction={{ xs: 'column', md: 'row' }}
          sx={cardContainerSx}
        >
          {ministries.map((i) => (
            <MinistryCard {...{
              header: { title: i.title },
              content: i.content,
              link: i.link,
              image: {
                root: {
                  sx: imageRootSx
                },
                image: {
                  src: i.image,
                  alt: `${i.title} image`
                }
              }
            }} key={`${i.title} image`}
            />
          ))}
        </Stack>
      </Grid>
    </Container>

  );
};

export default Home;
