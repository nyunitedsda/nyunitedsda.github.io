import { CardActions, CardContent, CardHeader, type CardHeaderProps, type SxProps, type Theme } from "@mui/material"
import Card from "@mui/material/Card"
import type { FC, ReactNode } from "react"
// import type { CardProps } from "./types"

export interface CardProps {
  header: CardHeaderProps
  content?: ReactNode
  actions?: ReactNode
}


const cardSx: SxProps<Theme> = (theme) => ({
  display: "flex",
  flexDirection: "column",
  boxShadow: 5,
  maxWidth: `${theme.spacing(50)}`,
  "& .MuiCardHeader-title": {
    fontSize: "1.25rem",
  },
})

const ProjectCard: FC<CardProps> = ({ actions, content, header }) => {
  return (
    <Card sx={cardSx}>
      <CardHeader {...header} />
      {content && <CardContent sx={{ flexGrow: 1, overflowY: "auto" }}>{content}</CardContent>}
      {actions && <CardActions>{actions}</CardActions>}
    </Card>
  )
}

export default ProjectCard
