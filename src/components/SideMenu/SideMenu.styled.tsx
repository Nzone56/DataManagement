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
})<{ expanded: boolean }>(({ expanded, theme }) => ({
  display: "flex",
  flexDirection: "column",
  position: "absolute",
  backgroundColor: theme.palette.primary.main,
  color: "white",
  borderRadius: "0px 15px 15px 0px",
  margin: "5px 0px 5px 5px",
  height: "calc(100% - 10px)",
  width: expanded ? "200px" : "50px",
  transition: "width 0.25s ease-in",
  zIndex: "1000",
  overflowY: expanded ? "auto" : "hidden",
  overflowX: "hidden",

  /* Custom Scrollbar */
  "&::-webkit-scrollbar": {
    width: "8px",
  },
  "&::-webkit-scrollbar-track": {
    background: "rgba(255, 255, 255, 0.1)",
    borderRadius: "15px",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "rgba(255, 255, 255, 0.3)",
    borderRadius: "15px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: "rgba(255, 255, 255, 0.5)",
  },
}));

export const SideMenuTitle = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "animate",
})<{ animate: boolean }>(({ animate }) => ({
  opacity: animate ? 1 : 0,
  animation: animate ? `${fadeInTitles} 0.5s ease-in-out` : "none",
  transition: "opacity 0.5s ease-in-out",
  whiteSpace: "nowrap",
}));

export const SideMenuSubTitle = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "animate",
})<{ animate: boolean }>(({ animate, theme }) => ({
  color: theme.palette.secondary.contrastText,
  fontSize: "1.3rem",
  opacity: animate ? 1 : 0,
  animation: animate ? `${fadeInTitles} 0.3s ease-in-out` : "none",
  transition: "opacity 0.5s ease-in-out",
  whiteSpace: "nowrap",
  visibility: animate ? "visible" : "hidden",
}));

export const MenuHeader = styled(Box)({
  display: "flex",
  alignItems: "center",
  fontSize: "1.4rem",
  marginBottom: "16px",
  paddingTop: "16px",
});

export const MenuSection = styled("section")({
  marginTop: "16px",
});

export const MenuHr = styled("hr")({
  margin: "0px 10px",
  height: "2px",
  backgroundColor: "#3872f9",
});

export const LogoMenu = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "35px",
  minWidth: "35px",
  height: "35px",
  margin: "7.5px",
  padding: "7.5px",
  borderRadius: "10px",
  backgroundColor: theme.palette.primary.light,
  "& > svg": {
    fill: "white",
    width: "100%",
    height: "100%",
  },
}));

export const MenuOption = styled(Box, {
  shouldForwardProp: (prop) => prop !== "animate",
})<{ animate: boolean }>(({ animate, theme }) => ({
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
    backgroundColor: theme.palette.primary.light,
    opacity: 0.7,
  },

  // ICON STYLES
  "& svg": {
    fill: "white",
    width: "25px",
    height: "25px",
  },
  // TEXT STYLES
  "& Typography": {
    marginLeft: "16px",
    fontWeight: "500",
    fontSize: "1.4rem",
    opacity: animate ? 1 : 0,
    animation: animate ? `${fadeInTitles} 0.3s ease-in-out` : "none",
    transition: "opacity 0.5s ease-in-out",
  },
}));

export const MenuOptionLabel = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "animate",
})<{ animate: boolean }>(({ animate }) => ({
  marginLeft: "12px",
  fontWeight: "400",
  fontSize: "1.4rem",
  opacity: animate ? 1 : 0,
  animation: animate ? `${fadeInTitles} 0.3s ease-in-out` : "none",
  transition: "opacity 0.5s ease-in-out",
  whiteSpace: "nowrap",
  visibility: animate ? "visible" : "hidden",
}));

export const SideMenuPoint = styled(Box, {
  shouldForwardProp: (prop) => prop !== "active",
})<{ active: boolean }>(({ active }) => ({
  position: "absolute",
  borderRadius: "50%",
  width: "7px",
  height: "7px",
  backgroundColor: active ? "white" : "#4b81f9",
  marginLeft: "8px",
}));

export const SideMenuLine = styled(Box)({
  width: "1px",
  height: "42px",
  backgroundColor: "#4b81f9",
  marginLeft: "11px",
});
