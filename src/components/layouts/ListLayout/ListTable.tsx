import {
  MoreVert as MoreVertIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import {
  ListContainer,
  PaperTableContainer,
  StyledTableFooter,
  TableCellStyled,
  StyledTableHeader,
} from "./ListLayout.styled";
import {
  TableContainer,
  Table,
  TableRow,
  TableBody,
  TablePagination,
} from "@mui/material";
import { codeToText, localeDictionary } from "../../../utils/locale";
import { formatDate } from "../../../utils/dates";
import { useEffect, useState } from "react";
import { TablePaginationActions } from "./ListPaginationActions";
import { IconContainer } from "../../Components.styled";

interface ListTableProps<T> {
  list: T[];
  header: string[];
  title: string;
  searchState: string;
}

export const ListTable = <T extends Record<string, string | number>>({
  list,
  header,
  title,
  searchState,
}: ListTableProps<T>) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filteredValues, setFilteredValues] = useState<T[]>([]);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Update filtered list
  useEffect(() => {
    const filtered = list.filter((listitem) => {
      const normalizedName = String(listitem.name)
        .normalize("NFD") // Acents and special chars
        .replace(/[\u0300-\u036f]/g, "") // Diacritics
        .toLocaleLowerCase(); // To lower case
      const normalizedSearchState = searchState.toLocaleLowerCase();

      return normalizedName.includes(normalizedSearchState);
    });

    setFilteredValues(filtered);
  }, [searchState, list]);

  return (
    <ListContainer>
      <TableContainer component={PaperTableContainer}>
        <Table>
          <StyledTableHeader>
            <TableRow>
              {header.map((row) => {
                if (row in localeDictionary) {
                  return (
                    <TableCellStyled
                      cellwidth={((100 - 5) / header.length).toString()}
                      header={true}
                      key={row}
                    >
                      {codeToText(row as keyof typeof localeDictionary)}
                    </TableCellStyled>
                  );
                }
                return (
                  <TableCellStyled
                    cellwidth={((100 - 5) / header.length).toString()}
                    header={true}
                  >
                    Desconocido
                  </TableCellStyled>
                );
              })}
              <TableCellStyled cellwidth="5" header={true}>
                <IconContainer>
                  <SettingsIcon /> {/* Aquí aplicas el tamaño real del icono */}
                </IconContainer>
              </TableCellStyled>
            </TableRow>
          </StyledTableHeader>
          <TableBody>
            {(rowsPerPage > 0
              ? filteredValues.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : filteredValues
            ).map((filteredItem) => (
              <TableRow key={filteredItem.id}>
                {header.map((headerItem, index) => (
                  <TableCellStyled key={index} cellwidth="" header={false}>
                    {headerItem === "joinedDate"
                      ? formatDate(Number(filteredItem[headerItem]))
                      : filteredItem[headerItem]}
                  </TableCellStyled>
                ))}
                <TableCellStyled cellwidth="5" header={false}>
                  <IconContainer>
                    <MoreVertIcon />
                  </IconContainer>
                </TableCellStyled>
              </TableRow>
            ))}
          </TableBody>
          <StyledTableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "Todos", value: -1 }]}
                colSpan={3}
                count={filteredValues.length}
                rowsPerPage={rowsPerPage}
                page={page}
                slotProps={{
                  select: {
                    inputProps: {
                      "aria-label": `${title} por página`,
                    },
                    native: true,
                  },
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage={`${title} por página`}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </StyledTableFooter>
        </Table>
      </TableContainer>
    </ListContainer>
  );
};
