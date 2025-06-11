import { lazy } from 'react';

const EventOutlined = lazy(() => import('@mui/icons-material/EventOutlined'));

const DEFAULT_ANNOUNCEMENT_PROPERTIES = {
  eventDate: {
    title: "When",
    icon: (
      <Suspense fallback={<div>Loading icon...</div>}>
        <EventOutlined />
expor