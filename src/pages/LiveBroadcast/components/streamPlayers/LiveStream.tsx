import Paper from '@mui/material/Paper';
import type { FC } from 'react';

const LiveStream: FC = () => {

  return (
    <>
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
        {/* https://www.churchstreaming.tv/ embedded iframe */}
        <iframe
          id="sermon-cloud-embed"
          title="Live Broadcast Stream"
          width="100%"
          height="100%"
          allowFullScreen
          allow="autoplay"
          src="https://embeds.sermoncloud.com/new-york-united/live?theme=dark"
        >
        </iframe>
      </Paper>


      {/* <Paper
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
      </Paper> */}



    </>
  )
};

export default LiveStream;
