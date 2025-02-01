import { Box, keyframes, styled, Typography } from "@mui/material";

const fadeInTitles = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const SideMenuContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== "expanded",
})<{ expanded: boolean }>(({ expanded }) => ({
  display: "flex",
  flexDirection: "column",
  position: "absolute",
  backgroundColor: "#2864f6",
  color: "white",
  borderRadius: "0px 15px 15px 0px",
  margin: "5px 0px 5px 5px",
  height: "calc(100% - 10px)",
  width: expanded ? "200px" : "50px",
  transition: "width 0.25s ease-in",
}));

export const SideMenuTitle = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "animate",
})<{ animate: boolean }>(({ animate }) => ({
  fontSize: "0.9rem",
  opacity: animate ? 1 : 0,
  animation: animate ? `${fadeInTitles} 0.5s ease-in-out` : "none",
  transition: "opacity 0.5s ease-in-out",
  whiteSpace: "nowrap",
}));

export const SideMenuSubTitle = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "animate",
})<{ animate: boolean }>(({ animate }) => ({
  color: "#b7e1fa",
  fontSize: "0.7rem",
  opacity: animate ? 1 : 0,
  animation: animate ? `${fadeInTitles} 0.3s ease-in-out` : "none",
  transition: "opacity 0.5s ease-in-out",
}));

export const MenuHeader = styled(Box)({
  display: "flex",
  alignItems: "center",
  fontSize: "0.9rem",
  marginBottom: "1rem",
  paddingTop: "1rem",
});

export const MenuSection = styled("section")({
  marginTop: "1rem",
});

export const MenuHr = styled("hr")({
  margin: "0px 10px",
  height: "2px",
  backgroundColor: "#3872f9",
});

export const LogoMenu = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "35px",
  minWidth: "35px",
  height: "35px",
  margin: "7.5px",
  padding: "7.5px",
  borderRadius: "10px",
  backgroundColor: "#4a7df6",
  "& > svg": {
    fill: "white",
    width: "100%",
    height: "100%",
  },
});

export const MenuOption = styled(Box, {
  shouldForwardProp: (prop) => prop !== "animate",
})<{ animate: boolean }>(({ animate }) => ({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  width: "calc(100% - 15px)",
  height: "35px",
  margin: "7.5px",
  cursor: "pointer",
  padding: "5px",
  borderRadius: "5px",
  "&:hover": {
    backgroundColor: "#4a7df6",
    opacity: 0.7,
  },

  // ICON STYLES
  "& > svg": {
    fill: "white",
    width: "25px",
    height: "25px",
  },
  // TEXT STYLES
  "& > span": {
    marginLeft: "1rem",
    fontWeight: "500",
    fontSize: "0.8rem",
    opacity: animate ? 1 : 0,
    animation: animate ? `${fadeInTitles} 0.3s ease-in-out` : "none",
    transition: "opacity 0.5s ease-in-out",
  },
}));
