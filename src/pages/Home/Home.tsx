import { Container, Grid, Stack, Typography } from "@mui/material";
import { type FC } from "react";

import MinistryCard from "./components/MinistryCard";
import { ministries } from "./constants";
// import Link from "next/link"
// import Image from "next/image"

const MINISTRIES_HEADER = "Ministries Links";

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

      <Grid size={{ xs: 12 }}>
        <Typography
          width={"100%"}
          textAlign={"center"}
          variant="h4"
          component="h2"
          sx={{ mb: 4, fontWeight: "bold", color: "primary.main" }}
        >
          {MINISTRIES_HEADER}
        </Typography>

        <Stack
          direction={{ xs: 'column', md: 'row' }}
          sx={{
            alignItems: { xs: 'center', md: 'flex-start' },
            '& .MuiPaper-root': {
              height: theme => `${theme.spacing(36)}`,
              maxWidth: { md: '32%' }
            },
          }}
          flexWrap="wrap"
          gap={2}
          width="100%"
        >
          {ministries.map((i) => (
            // <Stack key={i.title} className="card-animation">
            <MinistryCard {...{
              header: { title: i.title },
              content: i.content,
              link: i.link,
              image: {
                root: {
                  sx: {
                    // height: theme => `${theme.spacing(12)}`,
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    height: theme => `${theme.spacing(11)}`
                  }
                },
                image: {
                  src: i.image,
                  alt: `${i.title} image`
                }
              }
            }} key={`${i.title} image`}

            />

            // </Stack>
          ))}
        </Stack>
      </Grid>
    </Container>

  );
};

export default Home;
