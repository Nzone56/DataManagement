import { Box, styled, Typography } from "@mui/material";

export const LandingPageContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100vw",
  height: "100vh",
  backgroundColor: theme.palette.secondary.dark,
}));

export const LandingPageCard = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "white",
  height: "90%",
  width: "90%",
  borderRadius: "16px",
});

export const LandingPageLogin = styled(Box)({
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  backgroundColor: "white",
  width: "50%",
  color: "black",
  padding: "32px 76px",
});

export const LandingPagePreview = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  backgroundColor: theme.palette.primary.main,
  margin: "16px",
  padding: "16px",
  width: "calc(50% - 32px)",
  height: "calc(100% - 32px)",
  borderRadius: "16px",
  color: "white",
}));

export const LandingPageTitle = styled(Typography)({
  fontWeight: "500",
});

export const LandingPageSubTitle = styled(Typography)({
  fontWeight: "400",
});
