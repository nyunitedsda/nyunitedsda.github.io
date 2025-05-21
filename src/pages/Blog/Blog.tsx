import CalendarToday from '@mui/icons-material/CalendarToday';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import type { SxProps, Theme } from '@mui/material/styles';
import { type FC, useCallback, useMemo, useState } from 'react';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import blogPosts from './blogPosts';

const containerSx: SxProps<Theme> = {
  flexGrow: 1,
  display: 'flex',
  alignContent: 'flex-start',
  flexWrap: 'wrap'
}

const DEFAULT_POST_PER_PAGE = 4
const HEADER = 'Our Blog'
const SUBHEADER = 'Insights, reflections, and spiritual guidance from our church community.'

const Blog: FC = () => {
  const [page, setPage] = useState(1)
  const [postsPerPage, _setPostsPerPage] = useState<number>(DEFAULT_POST_PER_PAGE);

  const totalPages = useMemo(() => Math.ceil(blogPosts.length / postsPerPage), [blogPosts, postsPerPage])

  const currentPosts = useMemo(() => blogPosts.slice((page - 1) * postsPerPage, page * postsPerPage), [blogPosts, postsPerPage, page])

  const handlePageChange = useCallback((_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, []);



  return (
    <PageWrapper header={HEADER} subHeader={SUBHEADER}>

      <Grid container spacing={4} sx={containerSx}>
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

      <Box sx={{ display: "flex", justifyContent: "center", bottom: 0, mt: 6 }}>
        <Pagination count={totalPages} page={page} onChange={handlePageChange} color="primary" size="large" />
      </Box>
      
    </PageWrapper >
  )
};

export default Blog;
