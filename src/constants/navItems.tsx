import { Article, ContactMail, Diversity3Rounded, Home, LiveTv } from "@mui/icons-material";

const navItems = [
  { name: "Home", path: "/", icon: <Home /> },
  { name: "Watch Live", path: "/live-broadcast", icon: <LiveTv /> },
  { name: "Blog", path: "/blog", icon: <Article /> },
  {name: 'About Us', path: "/aboutUs", icon: <Diversity3Rounded/> },
  { name: "Contact", path: "/contact", icon: <ContactMail /> },
]

export default navItems;