import { Box, Button, IconButton, styled } from "@mui/material";

export const ColumnJustifyFlex = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
});

export const CenterdBox = styled(Box)({
  display: "flex",
  alignItems: "center",
});

export const CenteredBoxBetween = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const IconBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  borderRadius: "5px",
  padding: "5px",
  cursor: "pointer",
  border: `1px solid ${theme.palette.secondary.light}`,
  "& > svg": {
    fill: theme.palette.secondary.dark,
    width: "18px",
    height: "18px",
  },
}));

export const IconButtonContainer = styled(IconButton)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
});

export const PrimaryButton = styled(Button)(({ theme }) => ({
  padding: "5px 10px",
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.primary.dark,
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
  },
}));
