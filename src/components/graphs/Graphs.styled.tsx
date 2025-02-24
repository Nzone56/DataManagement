import { Box, styled, Typography } from "@mui/material";

export const AreaGraphDashboardContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  margin: "16px",
  background: "#fff",
  color: "#000",
  borderRadius: "10px",
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
});

export const AreaGraphDashboardTitle = styled(Typography)({
  fontWeight: 600,
  margin: "16px 0 0 24px",
  lineHeight: "1.15",
});

export const AreaGraphDashboardSubTitle = styled(Typography)({
  marginLeft: "24px",
  lineHeight: "1.15",
});
