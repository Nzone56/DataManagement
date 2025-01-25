import { Box, Icon, styled } from "@mui/material";

export const SideMenuContainer = styled(Box)<{ active: boolean }>(
  ({ active }) => ({
    position: "absolute",
    backgroundColor: "#2864f6",
    color: "white",
    borderRadius: "0px 15px 15px 0px",
    width: active ? "150px" : "50px",
    height: "calc(100% - 10px)",
    margin: "5px",
    transition: "width 0.2s ease-in",
  })
);

export const MenuOption = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
});

export const MenuIcon = styled(Icon)({
  color: "white",
  fontSize: "25px",
  padding: "5px",
});
