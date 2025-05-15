import { FC } from 'react';
import { useState } from "react"
import { Box, Container, Typography, Grid, Button } from "@mui/material"

import { CalendarToday, AccessTime, Notifications } from "@mui/icons-material"
import ProjectCard from '../../components/ProjectCard/ProjectCard';
// import Link from "next/link"
// import Image from "next/image"

const MINISTRIES_HEADER = 'Ministries Links';

const Home: FC = () => {
  
   const [notifications] = useState([
    {
      id: 1,
      title: "Special Prayer Service",
      content: "Join us for a special prayer service this Wednesday at 7 PM.",
      date: "2023-05-18",
    },
    {
      id: 2,
      title: "Community Outreach",
      content: "Volunteer for our community outreach program this Saturday.",
      date: "2023-05-21",
    },
    {
      id: 3,
      title: "Bible Study Group",
      content: "New Bible study group starting next Monday at 6:30 PM.",
      date: "2023-05-23",
    },
  ])

  const services = [
    {
      id: 1,
      day: "Sunday",
      time: "9:00 AM & 11:00 AM",
      name: "Sunday Worship",
    },
    {
      id: 2,
      day: "Wednesday",
      time: "7:00 PM",
      name: "Midweek Service",
    },
    {
      id: 3,
      day: "Friday",
      time: "6:30 PM",
      name: "Youth Group",
    },
  ]

  const ministries = [
    {
      title: 'Revive Reform Ministry',
      content: 'Revive Reform Radio streaming 24/7 Christian internet radio with music, seminars, live talk, natural health, and much more. ',
      link: 'http://www.revivereform.org/Radio/tabid/169/Default.aspx',
      image: 'http://nyunitedsda.org/portals/0/RRR%20welcome%20radio%202%20s.jpg',
    }, 
    {
      title: 'Free SDA Church',
      content: ' International Association of Free Seventh-day Adventists is a network of self-supporting SDA churches and ministries worldwide.',
      link: 'http://www.freesda.org/',
      image: 'http://nyunitedsda.org/portals/0/Free%20church%20logo.jpg',
    },
    {
      title: 'Amazing Facts',
      content: 'Amazing Facts is a multifaceted, soul-winning ministry committed to proclaiming the gospel and the three angels’ messages of Revelation 14',
      link: 'https://www.amazingfacts.org/',
      image: 'http://nyunitedsda.org/portals/0/af-logo-full.png',
    },
    
  ]

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      

      <Box
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
          <Typography variant="h2" component="h1" className="welcome-text" sx={{ mb: 2, fontWeight: "bold" }}>
            Welcome to Grace Community Church
          </Typography>
          <Typography variant="h5" className="welcome-text" sx={{ mb: 4 }}>
            A place of worship, community, and spiritual growth
          </Typography>
          <Button
            variant="contained"
            size="large"
            component={'a'}
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
      </Box>

      <Container maxWidth="lg" sx={{ mb: 8, flexGrow: 1, gap: 2 }}>
        <Grid container spacing={4}>
          

          <Grid size={{xs: 12, md: 12}}>
            <Typography variant="h4" component="h2" sx={{ mb: 4, fontWeight: "bold", color: "primary.main" }}>
              Latest Notifications
            </Typography>
            <Grid container spacing={3}>
              {notifications.map((notification, index) => (
                <Grid size={12}  key={notification.id} className="card-animation">
                  <ProjectCard
                    header={{
                      title: notification.title,
                      subheader: new Date(notification.date).toLocaleDateString(),
                      avatar: <Notifications color="primary" />,
                    }}
                    content={<Typography variant="body1">{notification.content}</Typography>}
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
        </Grid>

        <Grid  size={{xs: 12, md: 6}}>
            <Typography width={'100%'} textAlign={'center'} variant="h4" component="h2" sx={{ mb: 4, fontWeight: "bold", color: "primary.main" }}>
              {MINISTRIES_HEADER}
            </Typography>
            <Grid container spacing={3}>
              {ministries.map((i) => (
                <Grid size={{xs: 12}} key={i.title} className="card-animation">
                  <ProjectCard
                    header={{
                      title: i.title,
                      // subheader: `${service.day} at ${service.time}`,
                      avatar: <CalendarToday color="primary" />,
                      sx: { bgcolor: 'primary.main', color: 'primary.contrastText'},
                    }}
                    content={
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <AccessTime color="action" sx={{ mr: 1 }} />
                        <Typography variant="body1">
                          {i.content}
                          <a href={i.link}>{'Click here'}</a>
                          </Typography>
                      </Box>
                    }
                    actions={
                      <img src={i.image} alt={`${i.title} image`} style={{width: 'inherit', height: 'inherit'}}/>
                    }
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
      </Container>

      
    </Box>
  )
};
  
export default Home;
  