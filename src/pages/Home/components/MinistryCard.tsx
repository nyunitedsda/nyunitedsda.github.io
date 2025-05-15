import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { SxProps, Theme } from '@mui/material/styles';
import { type FC } from 'react';
import Image from '../../../components/Image/Image';
import ProjectCard from '../../../components/ProjectCard/ProjectCard';
import type { MinistryCardProps } from './types';

const contentSx: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  "& a": {
    textDecoration: "none",
    color: "primary.main",
  },
}

const MinistryCard: FC<MinistryCardProps> = (props) => {
  const { header, content, link, image } = props;
  return (
    <ProjectCard
      header={{
        ...header,
        sx: {
          bgcolor: "primary.main",
          color: "primary.contrastText",
        },
      }}
      content={
        <Box
          sx={contentSx}
        >

          <Typography variant="body1">
            {content}
            <a href={link}>{" Click here"}</a>
          </Typography>
        </Box>
      }
      actions={
        image ? (
          <Stack width={'100%'} direction={'row'} justifyContent={'center'}>
            <Image {...image} />
          </Stack>
        ) : undefined
      }
    />
  );
};

export default MinistryCard;