import type { CardHeaderProps } from "@mui/material/CardHeader";
import type { ReactNode } from "react";

export interface CardProps {
  header: CardHeaderProps;
  content?: ReactNode;
  actions?: ReactNode;
  className?: string;
}