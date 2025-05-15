import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import { type FC, useState } from "react";

import { AccessTime, CalendarToday, Notifications } from "@mui/icons-material";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import MinistryCard from "./components/MinistryCard";
import { ministries } from "./constants";
// import Link from "next/link"
// import Image from "next/image"

const MINISTRIES_HEADER = "Ministries Links";

const Home: FC = () => {


  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {/* <Box
        sx={{
          position: "relative",
          height: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          mb: 6,
        }}
      >
        <img
          src="/placeholder.svg?height=1080&width=1920"
          alt="Church sanctuary"
          // fill
          style={{ objectFit: "cover", filter: "brightness(0.7)" }}
        // priority
        />
        <Box
          sx={{
            position: "relative",
            textAlign: "center",
            color: "white",
            p: 4,
            maxWidth: "800px",
          }}
        >
          <Typography
            variant="h2"
            component="h1"
            className="welcome-text"
            sx={{ mb: 2, fontWeight: "bold" }}
          >
            Welcome to Grace Community Church
          </Typography>
          <Typography variant="h5" className="welcome-text" sx={{ mb: 4 }}>
            A place of worship, community, and spiritual growth
          </Typography>
          <Button
            variant="contained"
            size="large"
            component={"a"}
            href="/live"
            className="welcome-text"
            sx={{
              bgcolor: "primary.main",
              color: "white",
              px: 4,
              py: 1.5,
              "&:hover": { bgcolor: "primary.dark" },
            }}
          >
            Watch Live
          </Button>
        </Box>
      </Box> */}

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

        <Grid size={{ xs: 12, md: 6 }}>
          <Typography
            width={"100%"}
            textAlign={"center"}
            variant="h4"
            component="h2"
            sx={{ mb: 4, fontWeight: "bold", color: "primary.main" }}
          >
            {MINISTRIES_HEADER}
          </Typography>

          <Stack direction={'row'} flexWrap={'wrap'} gap={2} width={'100%'}>
            {ministries.map((i) => (
              // <Stack key={i.title} className="card-animation">
                <MinistryCard {...{
                  header: { title: i.title },
                  content: i.content,
                  link: i.link,
                  image: {
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
    </Box>
  );
};

export default Home;
