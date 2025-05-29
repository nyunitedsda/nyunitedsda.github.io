import type { SxProps, Theme } from "@mui/material/styles";
import type { EmblaOptionsType } from "embla-carousel";
import type { PropsWithChildren } from "react";

type CarouselProps = PropsWithChildren<{
  options?: EmblaOptionsType;
  sx?: SxProps<Theme>;
}>

export type { CarouselProps };