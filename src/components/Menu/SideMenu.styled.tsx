import { Box, styled } from "@mui/material";

export const SideMenuContainer = styled(Box)<{ active: boolean }>(
  ({ active }) => ({
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    backgroundColor: "#2864f6",
    color: "white",
    borderRadius: "0px 15px 15px 0px",
    width: active ? "200px" : "50px",
    height: "calc(100% - 10px)",
    margin: "5px",
    transition: "width 0.2s ease-in",
  })
);

export const MenuHeader = styled(Box)({
  marginBottom: "1rem",
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
  height: "35px",
  margin: "7.5px",
  padding: "7.5px",
  borderRadius: "10px",
  backgroundColor: "#4a7df6",
  "& > svg": {
    fill: "white", // Cambia el color del relleno del svg
    width: "100%", // Ajusta el tamaño al del contenedor padre
    height: "100%", // Ajusta la altura al contenedor
  },
});

export const MenuOption = styled(Box)({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  width: "calc(100% - 25px)",
  height: "25px",
  margin: "12.5px 12.5px 20px 12.5px",
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
  },
});
