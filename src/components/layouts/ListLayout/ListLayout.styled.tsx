import {
  Box,
  Chip,
  IconButton,
  Paper,
  styled,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  Typography,
} from "@mui/material";
import { Theme } from "@mui/material/styles";

const getResponsiveFontSize = (theme: Theme) => ({
  fontSize: "0.95rem",
  [theme.breakpoints.up("md")]: { fontSize: "1.1rem" },
  [theme.breakpoints.up("lg")]: { fontSize: "1.25rem" },
  [theme.breakpoints.up("xl")]: { fontSize: "1.4rem" },
});

export const ListLayoutContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  padding: "16px",
  overflowX: "hidden",
});

export const ListTitleContainer = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
});

export const ListTitle = styled(Typography)({
  marginBottom: "16px",
  fontWeight: 600,
});

export const FiltersContainer = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
});

export const ListContainer = styled(Box)({
  display: "flex",
  marginTop: "16px",
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
  cellminwidth: string;
  header: boolean;
}>(({ cellwidth, cellminwidth, header, theme }) => ({
  width: cellwidth ? `${cellwidth}%` : "auto",
  minWidth: cellminwidth ? `${cellminwidth}px` : "",
  border: "1px solid #e0e0e0",
  color: header ? "white" : "black",
  "& svg": {
    cursor: "pointer",
    fill: header ? "white" : "black",
    width: "20px",
    height: "20px",
    "&:hover": {
      fill: theme.palette.secondary.dark,
    },
  },
  fontSize: "0.95rem",
  padding: "4px",
  [theme.breakpoints.up("md")]: {
    fontSize: "1.1rem",
    padding: "8px",
  },
  [theme.breakpoints.up("lg")]: {
    fontSize: "1.25rem",
    padding: "12px",
  },
  [theme.breakpoints.up("xl")]: {
    fontSize: "1.4rem",
    padding: "16px",
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

export const StyledTablePagination = styled(TablePagination)({
  "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows": {
    fontSize: "1.3rem",
  },
  "& .MuiTablePagination-select": {
    fontSize: "1.3rem",
  },
  "& .MuiTablePagination-actions": {
    fontSize: "1.3rem",
  },
  "& .MuiTablePagination-menuItem": {
    fontSize: "1.2rem",
  },
});

export const TableText = styled(Typography)(({ theme }) => ({
  ...getResponsiveFontSize(theme),
}));

export const StyledChip = styled(Chip)<{ chipcolor: string; chiptextcolor: string }>(
  ({ chipcolor, chiptextcolor, theme }) => ({
    backgroundColor: chipcolor,
    color: chiptextcolor,
    border: `1px solid ${chipcolor}`,
    fontWeight: 500,
    ...getResponsiveFontSize(theme),
  })
);
