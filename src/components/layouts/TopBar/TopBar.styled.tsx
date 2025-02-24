import { Box, styled } from "@mui/material";

export const TopBarContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "16px 16px 12px 16px",
  width: "100%",
  borderBottom: `1px solid ${theme.palette.secondary.light}`,
  fontSize: "1.4rem",
  color: theme.palette.secondary.dark,

  "& svg": {
    fill: theme.palette.secondary.dark,
    width: "18px",
    position: "relative", // Necesario para que `&:after` se posicione correctamente
  },
}));

export const SearchTopBar = styled(Box)(({ theme }) => ({
  "& svg": {
    fill: theme.palette.secondary.dark,
    width: "22px",
    cursor: "pointer",
  },
}));
