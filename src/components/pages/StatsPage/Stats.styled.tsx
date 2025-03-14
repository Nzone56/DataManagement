import { AccordionSummary, Box, MenuItem, styled, Typography, Checkbox } from "@mui/material";

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

export const AccordionsContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  gap: "15px",
  marginTop: "20px",
  padding: "10px",
});

export const SmallMenuItem = styled(MenuItem)({
  maxHeight: "18px",
  padding: "4px 8px",
});

export const FilterCheckbox = styled(Checkbox)({
  padding: "4px",
});
export const FilterItemText = styled(Typography)({
  fontSize: "1.2rem",
});
