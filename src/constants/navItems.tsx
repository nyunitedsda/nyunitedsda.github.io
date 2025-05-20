import {
  Article,
  ContactMail,
  Diversity3Rounded,
  Home,
  LiveTv,
} from "@mui/icons-material";
import type { ReactNode } from "react";

export interface NavItem {
  name: string;
  path: string;
  icon: ReactNode;
};

const navItems: NavItem[] = [
  { name: "Home", path: "/", icon: <Home /> },
  { name: "Watch Live", path: "/live-broadcast", icon: <LiveTv /> },
  { name: "Blog", path: "/blog", icon: <Article /> },
  { name: "About Us", path: "/about-us", icon: <Diversity3Rounded /> },
  { name: "Contact", path: "/contact", icon: <ContactMail /> },
];



export default navItems;
