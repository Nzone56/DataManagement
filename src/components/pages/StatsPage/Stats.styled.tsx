import { AccordionSummary, Box, styled } from "@mui/material";

export const StatsContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  margin: "16px",
  maxHeight: "calc(100vh - 100px)",
  overflowY: "auto",
  flexGrow: 1,
});

export const MainAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark,
  color: theme.palette.primary.contrastText,
  borderRadius: "15px",

  "& svg": {
    color: theme.palette.primary.contrastText,
  },
}));

export const SecondaryAccordionSummary = styled(AccordionSummary)({
  backgroundColor: "#ffc107",
  borderRadius: "10px",
});
