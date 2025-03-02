import { Box, styled } from "@mui/material";

export const StatsContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  margin: "16px",
  maxHeight: "calc(100vh - 100px)",
  overflowY: "auto",
  flexGrow: 1,
});
