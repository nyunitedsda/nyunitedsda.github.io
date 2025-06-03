import type { FC } from 'react';
import useColorTheme from '../../../../hooks/theme/useColorTheme';
import StreamWrapper from './StreamWrapper';

const LiveStream: FC = () => {
  const { mode } = useColorTheme();


  return (
    <>
      <StreamWrapper>
        {/* https://https://my.churchstreaming.tv/StreamingSettings/embed/ live embedded iframe */}
        <iframe
          id="sermon-cloud-embed"
          title="Live Broadcast Stream"
          width="100%"
          height="100%"
          allowFullScreen
          seamless
          allow="autoplay"
          src={`https://embeds.sermoncloud.com/new-york-united/live?theme=${mode === 'dark' ? mode : 'light'}`}
        >
        </iframe>
      </StreamWrapper>
    </>
  )
};

export default LiveStream;
