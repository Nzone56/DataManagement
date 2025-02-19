import { Box, styled, Typography } from "@mui/material";

export const AreaGraphDashboardContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  margin: "1rem",
  background: "#fff",
  color: "#000",
  borderRadius: "10px",
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
});

export const AreaGraphDashboardTitle = styled(Typography)({
  fontSize: "25px",
  fontWeight: 600,
  margin: "1rem 0 0 1.5rem",
  lineHeight: "1.15",
});

export const AreaGraphDashboardSubTitle = styled(Typography)({
  fontSize: "15px",
  marginLeft: "1.5rem",
  lineHeight: "1.15",
});
