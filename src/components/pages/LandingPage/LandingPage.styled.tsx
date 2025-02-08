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
  borderRadius: "1rem",
});

export const LandingPageLogin = styled(Box)({
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  backgroundColor: "white",
  width: "50%",
  color: "black",
  padding: "2rem 5rem",
});

export const LandingPagePreview = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  backgroundColor: theme.palette.primary.main,
  margin: "1rem",
  padding: "1rem",
  width: "calc(50% - 2rem)",
  height: "calc(100% - 2rem)",
  borderRadius: "1rem",
  color: "white",
}));

export const LandingPageTitle = styled(Typography)({
  fontSize: "1.5rem",
  fontWeight: "500",
});

export const LandingPageSubTitle = styled(Typography)({
  fontSize: "0.9rem",
  fontWeight: "400",
});
