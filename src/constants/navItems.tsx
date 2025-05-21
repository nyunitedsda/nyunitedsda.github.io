import {
  Article,
  ContactMail,
  Diversity3Rounded,
  Home,
  LiveTv,
} from "@mui/icons-material";
import type { ReactNode } from "react";
import { BASE_URL } from "./routes";

export interface NavItem {
  name: string;
  path: string;
  icon: ReactNode;
};

const navItems: NavItem[] = [
  { name: "Home", path: `${BASE_URL}/`, icon: <Home /> },
  { name: "Watch Live", path: `${BASE_URL}/live-broadcast`, icon: <LiveTv /> },
  { name: "Blog", path: `${BASE_URL}/blog`, icon: <Article /> },
  { name: "About Us", path: `${BASE_URL}/about-us`, icon: <Diversity3Rounded /> },
  { name: "Contacts", path: `${BASE_URL}/contact`, icon: <ContactMail /> },
];



export default navItems;
