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
    h1: { fontSize: "3.5rem", fontWeight: 700 },
    h2: { fontSize: "2.8rem", fontWeight: 600 },
    h3: { fontSize: "2.2rem", fontWeight: 600 },
    h4: { fontSize: "1.8rem", fontWeight: 500 },
    h5: { fontSize: "1.6rem", fontWeight: 400 },
    body1: { fontSize: "1.4rem" },
  },
  breakpoints: {
    values: {
      xs: 400,
      sm: 720,
      md: 990,
      lg: 1200,
      xl: 1440,
    },
  },
});
