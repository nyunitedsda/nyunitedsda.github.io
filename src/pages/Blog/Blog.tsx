import CalendarToday from '@mui/icons-material/CalendarToday';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import { type FC, useCallback, useMemo, useState } from 'react';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import blogPosts from './blogPosts';

const DEFAULT_POST_PER_PAGE = 4
const HEADER = 'Our Blog'
const SUBHEADER = 'Insights, reflections, and spiritual guidance from our church community.'

const Blog: FC = () => {
  const [page, setPage] = useState(1)
  const [postsPerPage, setPostsPerPage] = useState<number>(DEFAULT_POST_PER_PAGE);
  
  const totalPages = useMemo(() => Math.ceil(blogPosts.length / postsPerPage), [blogPosts, postsPerPage])

   const currentPosts = useMemo(() => blogPosts.slice((page - 1) * postsPerPage, page * postsPerPage),[blogPosts, postsPerPage, page])

  const handlePageChange = useCallback((_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, []);

 

  return (
      <Container maxWidth="lg" sx={{ mt: 8, mb: 8, flexGrow: 1 }}>
        <Typography variant="h3" component="h1" sx={{ mb: 2, fontWeight: "bold", color: "primary.main" }}>
          {HEADER}
        </Typography>
        <Typography variant="h6" sx={{ mb: 6, color: "text.secondary" }}>
          {SUBHEADER}         
        </Typography>

        <Grid container spacing={4}>
          {currentPosts.map((post) => (
            <Grid size={{ xs: 12, md: 6 }} key={post.id} className="blog-card">
              <ProjectCard
                header={{
                  title: post.title,
                  subheader: `${new Date(post.date).toLocaleDateString()} | ${post.author}`,
                  avatar: <CalendarToday color="primary" />,
                }}
                content={<Typography variant="body1">{post.excerpt}</Typography>}
                actions={
                  <Button size="small" color="primary" component={'a'} href={`/blog/${post.slug}`}>
                    Read More
                  </Button>
                }
              />
            </Grid>
          ))}
        </Grid>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
          <Pagination count={totalPages} page={page} onChange={handlePageChange} color="primary" size="large" />
        </Box>
      </Container>
  )
};

export default Blog;
