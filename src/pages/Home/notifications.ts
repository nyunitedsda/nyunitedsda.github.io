export interface ChurchNotificationProps {
  type: "event" | "service" | "announcement"
  title: string
  date?: string
  time?: string
  location?: string
  description?: string
  phoneNumber?: string
  conferenceCode?: string
  speaker?: string
  sermonTitle?: string
  addToCalendarLink?: string
  variant?: "primary" | "secondary" | "dark"
}


export const notifications: ChurchNotificationProps[] = [
    {
      type: "service",
      title: "Church Service",
      date: "March 22, 2025",
      speaker: "Pastor John Lomacang",
      sermonTitle: "STAND",
      variant: "primary",
    },
    {
      type: "event",
      title: "Wednesday Bible Study",
      time: "Wednesdays, 6:30pm",
      location: "Fellowship Hall & Via Zoom",
      variant: "dark",
    },
    {
      type: "event",
      title: "TVCJA Soup and Salad Fundraiser",
      time: "Wednesdays, 5:45pm",
      location: "Fellowship Hall",
      description:
        "The Thompsonville Christian Junior Academy is offering a soup and salad meal as a fundraiser every Wednesday before Wednesday Bible Study. Come out and support the school by having a meal before joining in Wednesday Bible Study.",
      variant: "secondary",
    },
    {
      type: "event",
      title: "Prayer Meeting",
      time: "Tuesdays, 6:30pm",
      location: "Via phone conference",
      phoneNumber: "971-224-6575",
      conferenceCode: "519018",
      variant: "dark",
    },
    {
      type: "announcement",
      title: "Volunteer Opportunity",
      description:
        "We need volunteers for our upcoming community outreach event. Please sign up at the welcome desk or contact the church office.",
      variant: "primary",
    },
    {
      type: "event",
      title: "Youth Group Meeting",
      time: "Fridays, 7:00pm",
      location: "Youth Room",
      description: "All teenagers are welcome to join for games, worship, and Bible study.",
      variant: "secondary",
    },
  ]