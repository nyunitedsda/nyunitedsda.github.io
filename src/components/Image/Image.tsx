import { Box } from '@mui/material';
import { type FC } from 'react';
import type { ImageProps } from './types';



const Image: FC<ImageProps> = ({ root, image }) => {

  return (
    <Box {...root}>
      <img {...image} />
    </Box>
  );
};

export default Image;