import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const MainLayoutContainer = styled(Box)({
  display: "flex",
  minHeight: "100vh",
});

export const MainContentContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  marginLeft: "55px",
  flexBasis: 0,
  flexGrow: 1,
});
