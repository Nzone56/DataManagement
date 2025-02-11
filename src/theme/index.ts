import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#2864f6",
      light: "#4a7df6",
      dark: "#002a8f",
      contrastText: "#fff",
    },
    secondary: {
      main: "#2864f6",
      light: "#d4d4d4",
      dark: "#b4b5b9",
      contrastText: "#b7e1fa",
    },
    background: {
      default: "#f4f4f4",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
});
