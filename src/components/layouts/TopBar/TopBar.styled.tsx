import { Box } from "@mui/material";
import styled from "styled-components";

export const TopBarContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "15px",
  width: "100%",
  borderBottom: "1px solid #f4f4f4",
  fontSize: "0.9rem",
  color: "#b4b5b9",

  "& svg": {
    fill: "#b4b5b9",
    width: "18px",
    position: "relative", // Necesario para que `&:after` se posicione correctamente
  },
});

export const SearchTopBar = styled(Box)({
  "& svg": {
    fill: "#b4b5b9",
    width: "22px",
    cursor: "pointer",
  },
});
