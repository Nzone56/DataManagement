import { Box, styled, Typography } from "@mui/material";
import { theme } from "../../../theme";
import { Close } from "@mui/icons-material";

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
  padding: "24px 32px",
  borderRadius: "15px",
  display: "flex",
  flexDirection: "column",
});

export const ModalHeader = styled(Box)({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  marginBottom: "12px",
});

export const ModalTitle = styled(Typography)({
  fontWeight: "600",
});

export const ModalSubTitle = styled(Typography)({
  color: theme.palette.secondary.dark,
});

export const ModalIcon = styled(Box)({
  marginRight: "8px",
  "& > svg": {
    width: "25px",
    height: "25px",
  },
});

export const ModalBody = styled(Box)({
  height: "calc(75vh - 150px)",
  overflowX: "auto",
  display: "flex",
  flexDirection: "column",
});

export const ModalFormTitle = styled(Typography)({
  fontWeight: "500",
  marginBottom: "4px",
});

export const ModalFooter = styled(Box)({
  alignSelf: "flex-end",
  marginTop: "24px",
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

export const CloseIcon = styled(Close)<{ xcolor: string }>(({ xcolor }) => ({
  color: `${xcolor} !important`,
}));
