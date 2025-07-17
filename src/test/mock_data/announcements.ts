import type { AnnouncementType } from "../../api/request/types";

export const initialAnnouncement: AnnouncementType = {
  id: 0,
  title: "",
  type: "event",
  description: "",
  location: "",
  conference_code: "",
  phone_number: "",
  sermon: "",
  speaker: "",
  recurring: false,
  created_at: "",
  author_id: 0,
  event_date: undefined,
  date_format: "MM/DD/YYYY",
  zoom_id: "",
  passcode: ""
};

const announcements: AnnouncementType[] = [
  {
    id: 1,
    title: "Sabbath Worship Service",
    type: "service",
    description: "Join us for our weekly Sabbath worship.",
    location: "Main Sanctuary",
    created_at: "2025-07-01T09:00:00Z",
    author_id: 1,
    event_date: new Date("2025-07-19T10:00:00Z"),
    date_format: "MM/DD/YYYY",
    speaker: "Pastor John Doe",
    sermon: "Faith and Hope",
    recurring: true
  },
  {
    id: 2,
    title: "Youth Conference 2025",
    type: "conference",
    description: "Annual youth conference with guest speakers.",
    location: "Community Hall",
    created_at: "2025-06-15T12:00:00Z",
    author_id: 2,
    event_date: new Date("2025-08-10T09:00:00Z"),
    date_format: "MM/DD/YYYY",
    conference_code: "YTH2025"
  }
];

export default announcements;