import Paper from '@mui/material/Paper';
import type { FC } from 'react';

const ArchiveStream: FC = () => {

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        bgcolor: "background.paper",
        borderRadius: 2,
        height: "100%",
        width: "100%",
      }}
    >
      <iframe
        id="sermon-cloud-embed"
        title="Sermons Grid"
        width="100%"
        height="100%"
        allowFullScreen
        src="https://embeds.sermoncloud.com/new-york-united/sermons?view=grid"
      >
      </iframe>
    </Paper>
  );
};

export default ArchiveStream;
