import { EventRounded, InfoRounded, LocationOnRounded, Person3Rounded } from '@mui/icons-material';
import { Divider, capitalize } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { type FC, type ReactNode, useMemo } from 'react';
import ProjectCard from '../../../../components/ProjectCard/ProjectCard';
import type { ChurchNotificationProps } from '../../notifications';
import type { NotificationCardProps } from './types';

interface Section {
  icon?: ReactNode;
  content: string;
  title: string;
}



const NoteSection: FC<Section> = ({ icon, content, title }) => (
  <Box sx={{ display: "flex", alignItems: "flex-start", mb: 2 }}>
    {icon && icon}
    <Box>
      <Typography variant="subtitle2" color="text.secondary" fontWeight='bold'>
        {`${title}:`}
      </Typography>
      <Typography variant="body1">{content}</Typography>
    </Box>
  </Box>
)

const WHEN = 'When:'
const WHERE = 'Where:'

const contentKeys = [
  'date',
  'time',
  'location',
  'speaker',
  'sermonTitle',
  'phoneNumber',
  'conferenceCode',
]

const createFormattedContent = (props: ChurchNotificationProps) => {

  const elements = [];
  return contentKeys.forEach((i) => {

    switch (i) {
      case 'date':
      case 'time':
        const display = props?.date && props?.time ? `${props?.date}, ${props?.time}` : props?.date ? props?.date : props?.time;
        return props?.date || props?.time ? ({ content: display, icon: <EventRounded color='primary' />, title: WHEN }) : undefined

      case 'location':
        return props?.location ? ({ icon: <LocationOnRounded color='primary' />, content: props?.location, title: WHERE }) : undefined

      case 'speaker':
        return props?.speaker ? ({
          content: props.speaker,
          icon: <Person3Rounded color='primary' />,
          title: capitalize(props.speaker),
        }) : undefined

      default:
        break;
    }

  })
}

const NotificationCard: FC<NotificationCardProps> = (props) => {
  const { title, date, time } = props;

  const contents = useMemo(() => {
    return createFormattedContent(props);
  }, [props]);

  return (
    <ProjectCard
      header={{ title }}
      content={
        (<>
          {
            contents.map((i) => (
              <NoteSection {...i} key={i.title} />
            ))
          }
        </>)
      }
      actions={
        description ? (
          <>
            <Divider />
            <Box sx={{ display: "flex", alignItems: "flex-start", mb: 2 }}>
              <InfoRounded color='primary' />

              <Typography variant="subtitle2" color="text.secondary" fontWeight='bold'>
                {description}
              </Typography>
            </Box>
          </>
        ) : undefined

      }
    />
  );
};

export default NotificationCard;
