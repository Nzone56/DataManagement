import { Box, Chip, IconButton, Paper, styled, TableCell, TableFooter, TableHead } from "@mui/material";

export const ListLayoutContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  padding: "1rem",
});

export const ListTitleContainer = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
});

export const ListTitle = styled("h2")({
  fontSize: "1.8rem",
  marginBottom: "1rem",
  fontWeight: 600,
});

export const FiltersContainer = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
});

export const ListContainer = styled(Box)({
  display: "flex",
  marginTop: "1rem",
  maxHeight: "calc(100vh - 200px)",
});

export const PaperTableContainer = styled(Paper)({
  backgroundColor: "#f4f4f4",
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
});

export const TableCellStyled = styled(TableCell, {
  shouldForwardProp: (prop) => prop !== "header",
})<{
  cellwidth: string;
  header: boolean;
}>(({ cellwidth, header, theme }) => ({
  width: cellwidth ? `${cellwidth}%` : "auto",
  border: "1px solid #e0e0e0",
  color: header ? "white" : "black",
  "& svg": {
    cursor: "pointer",
    fill: header ? "white" : "black",
    width: "22px",
    height: "22px",
    "&:hover": {
      fill: theme.palette.secondary.dark,
    },
  },
}));

export const TableIconButtonContainer = styled(IconButton)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "30px",
  height: "30px",
  padding: "4px",
});

export const TableCellStyledIcon = styled(TableCell, {
  shouldForwardProp: (prop) => prop !== "header",
})<{
  header: boolean;
}>(({ header, theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "100%",
  border: "1px solid #e0e0e0",
  color: header ? "white" : "black",
  "& svg": {
    cursor: "pointer",
    fill: header ? "white" : "black",
    width: "22px",
    height: "22px",

    "&:hover": {
      fill: theme.palette.secondary.dark,
    },
  },
}));

export const StyledTableHeader = styled(TableHead)(({ theme }) => ({
  position: "sticky",
  top: 0,
  zIndex: 1,
  backgroundColor: theme.palette.primary.dark,
  color: "white !important",
  border: "1px solid #e0e0e0",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
}));

export const StyledTableFooter = styled(TableFooter)({
  position: "sticky",
  bottom: 0,
  zIndex: 1,
  backgroundColor: "#f4f4f4",
  border: "1px solid #e0e0e0",
});

export const StyledChip = styled(Chip)<{ chipcolor: string; chiptextcolor: string }>(
  ({ chipcolor, chiptextcolor }) => ({
    backgroundColor: chipcolor,
    color: chiptextcolor,
    border: `1px solid ${chipcolor}`,
    "> span": {
      fontWeight: 500,
      fontSize: "1rem",
    },
  })
);
