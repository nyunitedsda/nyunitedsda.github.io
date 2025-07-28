import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import type { SxProps, Theme } from "@mui/material/styles";
import type { FC } from "react";

const contentSx: SxProps<Theme> = {
  color: "inherit",
  display: "flex",
  flexDirection: "column",
  fontSize: (theme) => `${theme.typography.body2.fontSize} !important`,
  gap: 1,
};

const FooterSegmentSkeleton: FC = () => (
  <>
    <Typography variant="h6" fontWeight="bold" mb={2} fontFamily="inter">
      <Skeleton width={120} height={28} />
    </Typography>
    <Typography variant="body2" mb={2}>
      <Skeleton width={180} height={20} />
    </Typography>
    <Box sx={contentSx}>
      <Skeleton width="80%" height={18} />
      <Skeleton width="60%" height={18} />
      <Skeleton width="70%" height={18} />
    </Box>
  </>
);

export default FooterSegmentSkeleton;
