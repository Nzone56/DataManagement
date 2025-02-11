import { Box, styled, Typography } from "@mui/material";
import { theme } from "../../../theme";

export const ModalInnerContainer = styled(Box)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  height: "75%",
  maxHeight: "800px",
  maxWidth: "650px",
  backgroundColor: "white",
  boxShadow: "24",
  padding: "1.5rem 2rem",
  borderRadius: "15px",
  display: "flex",
  flexDirection: "column",
});

export const ModalTitle = styled(Typography)({
  fontSize: "1.4rem",
  fontWeight: "600",
});

export const ModalSubTitle = styled(Typography)({
  fontSize: "0.9rem",
  color: theme.palette.secondary.dark,
});

export const ModalIcon = styled(Box)({
  marginRight: "0.5rem",
  "& > svg": {
    width: "25px",
    height: "25px",
  },
});

export const ModalBody = styled(Box)({
  marginTop: "0.5rem",
  height: "calc(75vh - 140px)",
  overflowX: "auto",
  display: "flex",
  flexDirection: "column",
});

export const ModalFormTitle = styled(Typography)({
  fontSize: "1rem",
  fontWeight: "500",
  marginBottom: "0.25rem",
});

export const ModalFooter = styled(Box)({
  alignSelf: "flex-end",
  marginTop: "auto",
});

export const ModalPickerPrev = styled(Box)<{
  color: string;
}>(({ color }) => ({
  backgroundColor: color,
  border: "1px solid black",
  cursor: "pointer",
  width: "25px",
  height: "25px",
}));
