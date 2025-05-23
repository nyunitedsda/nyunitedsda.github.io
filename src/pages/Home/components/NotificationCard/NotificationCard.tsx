import { AutoStoriesOutlined, CodeOutlined, EventOutlined, InfoOutlined, LocationOnOutlined, Person3Outlined, PhoneOutlined } from '@mui/icons-material';
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
  <Box sx={{ display: "flex", alignItems: "center", gap: 2, '& svg': { color: 'primary.main' } }}>
    {icon && icon}
    <Box sx={{ display: "flex", gap: 2}}>
      <Typography variant="body1" color="text.secondary" fontWeight='bold'>
        {`${title}:`}
      </Typography>
      <Typography variant="body1">{content}</Typography>
    </Box>
  </Box>
)

const WHEN = 'When'
const WHERE = 'Where'
const SERMON_TITLE = 'Sermon Title'
const PHONE_NUMBER = 'Phone #'
const CONFERENCE_CODE = 'Conference Code'
const SPEAKER = 'Speaker'

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

  const elements: Section[] = [];
  contentKeys.forEach((key) => {
    let section: Section | undefined;
    switch (key) {
      case 'date':
        if (props?.date) {
          const display = props?.date && props?.time ? `${props?.date}, ${props?.time}` : props?.date;
          section = { content: display!, icon: <EventOutlined />, title: WHEN };
        }
        break;
      case 'time':

        if (props?.time && !props?.date) {
          section = { content: props?.time, icon: <EventOutlined />, title: WHEN };
        }
        break;
      case 'location':
        if (props?.location) {
          section = { icon: <LocationOnOutlined />, content: props?.location, title: WHERE };
        }
        break;
      case 'speaker':
        if (props?.speaker) {
          section = {
            content: props.speaker,
            icon: <Person3Outlined />,
            title: SPEAKER,
          };
        }
        break;

      case 'sermonTitle':
        if (props?.sermonTitle) {
          section = {
            content: props.sermonTitle,
            icon: <AutoStoriesOutlined />,
            title: SERMON_TITLE,
          };
        }
        break;

      case 'phoneNumber':
        if (props?.phoneNumber) {
          section = {
            content: props.phoneNumber,
            icon: <PhoneOutlined />,
            title: PHONE_NUMBER,
          };
        }
        break;
      case 'conferenceCode':
        if (props?.conferenceCode) {
          section = {
            content: props.conferenceCode,
            icon: <CodeOutlined />,
            title: CONFERENCE_CODE,
          };
        }
        break;
      default:
        break;
    }
    if (section) {
      elements.push(section);
    }
  });
  return elements;
}

const NotificationCard: FC<NotificationCardProps> = (props) => {
  const { title, description } = props;

  const contents = useMemo(() => {
    return createFormattedContent(props) ?? [];
  }, [props]);

  return (
    <ProjectCard
      header={{
        title,
        sx: {
          bgcolor: "primary.main",
          color: "primary.contrastText",
        },
      }}
      content={
        (<>
          {
            contents.map((i) => (
              <NoteSection {...i} key={i?.title} />
            ))
          }
        </>)
      }
      actions={
        description ? (

          <Box sx={{
            pt: 2,
            display: "flex",
            alignItems: "center",
            gap: 2,
            height: '100%',
            borderTop: theme => `1px solid ${theme.palette.divider}`,
            '& p': {

              height: 'inherit',
              overflowY: 'auto',
            },
          }}>
            <InfoOutlined color='primary' />

            <Typography variant="body2" color="text.secondary" fontWeight='bold'>
              {description}
            </Typography>
          </Box>

        ) : undefined

      }
    />
  );
};

export default NotificationCard;
