import {
  MoreVert as MoreVertIcon,
  Settings as SettingsIcon,
  ArrowUpward as ArrowUpIcon,
  ArrowDownward as ArrowDownIcon,
} from "@mui/icons-material";
import {
  ListContainer,
  PaperTableContainer,
  StyledTableFooter,
  TableCellStyled,
  StyledTableHeader,
  TableIconButtonContainer,
  TableCellStyledIcon,
} from "./ListLayout.styled";
import { TableContainer, Table, TableRow, TableBody, TablePagination, Menu, MenuItem } from "@mui/material";
import { codeToText, localeDictionary } from "../../../utils/locale";
import { formatDate } from "../../../utils/dates";
import { useEffect, useState } from "react";
import { TablePaginationActions } from "./ListPaginationActions";
import { AsyncThunk } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { AppDispatch, ThunkApiConfig } from "../../../store/store";
import { CenteredBox } from "../../Components.styled";

interface ListTableProps<T> {
  list: T[];
  header: string[];
  title: string;
  searchState: string;
  handleOpenModal: (mode: "edit", data: T) => void;
  removeItem: AsyncThunk<string, string, ThunkApiConfig>;
}

export const ListTable = <T extends Record<string, string | number>>({
  list,
  header,
  title,
  searchState,
  handleOpenModal,
  removeItem,
}: ListTableProps<T>) => {
  const dispatch = useDispatch<AppDispatch>();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filteredValues, setFilteredValues] = useState<T[]>([]);
  const [sortedHeader, setSortedHeader] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  //TODO: Fix full sort and not only on page
  const [anchorEl, setAnchorEl] = useState<{
    [key: string]: HTMLElement | null;
  }>({});

  const handleDeleteItem = (id: string) => {
    dispatch(removeItem(id));
    handleCloseDropdown(id);
  };
  // -- DROPDOWN FUNCTIONS -- //
  const handleOpenDropdown = (event: React.MouseEvent<HTMLButtonElement>, id: string) => {
    setAnchorEl((prev) => ({ ...prev, [id]: event.currentTarget }));
  };

  const handleCloseDropdown = (id: string) => {
    setAnchorEl((prev) => ({ ...prev, [id]: null }));
  };

  // -- PAGINATION FUNCTIONS -- //
  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // -- SORTING FUNCTIONS -- //

  const handleSortHeader = (headerName: string) => {
    if (sortOrder === "") {
      setSortedHeader(headerName);
      setSortOrder("asc");
    } else if (sortOrder === "asc") {
      if (sortedHeader === headerName) {
        setSortOrder("desc");
      } else {
        setSortedHeader(headerName);
      }
    } else if (sortOrder === "desc") {
      if (sortedHeader === headerName) {
        setSortOrder("");
        setSortedHeader("");
      } else {
        setSortedHeader(headerName);
        setSortOrder("asc");
      }
    }
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
              {header.map((rowHeader: string) => {
                if (rowHeader in localeDictionary) {
                  return (
                    <TableCellStyled
                      cellwidth={((100 - 5) / header.length).toString()}
                      header={true}
                      key={rowHeader}
                      onClick={() => handleSortHeader(rowHeader)}
                      sx={{ cursor: "pointer" }}
                    >
                      <CenteredBox>
                        {codeToText(rowHeader as keyof typeof localeDictionary)}
                        {sortedHeader === rowHeader ? (
                          sortOrder === "asc" ? (
                            <ArrowUpIcon sx={{ marginLeft: "0.5rem", marginBottom: "0.15rem" }} />
                          ) : (
                            <ArrowDownIcon sx={{ marginLeft: "0.5rem" }} />
                          )
                        ) : null}
                      </CenteredBox>
                    </TableCellStyled>
                  );
                }
                return (
                  <TableCellStyled cellwidth={((100 - 5) / header.length).toString()} header={true}>
                    Desconocido
                  </TableCellStyled>
                );
              })}
              <TableCellStyledIcon header={true}>
                <TableIconButtonContainer>
                  <SettingsIcon />
                </TableIconButtonContainer>
              </TableCellStyledIcon>
            </TableRow>
          </StyledTableHeader>
          <TableBody>
            {(rowsPerPage > 0
              ? filteredValues.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : filteredValues
            )
              .sort((a, b) => {
                const valueA = a[sortedHeader];
                const valueB = b[sortedHeader];

                if (typeof valueA === "number" && typeof valueB === "number") {
                  return sortOrder === "desc" ? valueB - valueA : valueA - valueB;
                } else if (typeof valueA === "string" && typeof valueB === "string") {
                  return sortOrder === "desc" ? valueB.localeCompare(valueA) : valueA.localeCompare(valueB);
                }
                return 0;
              })
              .map((filteredItem) => {
                const itemId = String(filteredItem.id);
                const open = Boolean(anchorEl[itemId]);

                return (
                  <TableRow key={itemId}>
                    {header.map((headerItem, index) => (
                      <TableCellStyled key={index} cellwidth="" header={false}>
                        {headerItem === "joinedDate"
                          ? formatDate(Number(filteredItem[headerItem]))
                          : filteredItem[headerItem]}
                      </TableCellStyled>
                    ))}
                    <TableCellStyledIcon header={false} sx={{}}>
                      <TableIconButtonContainer
                        aria-controls={open ? `menu-${itemId}` : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClick={(event) => handleOpenDropdown(event, itemId)}
                      >
                        <MoreVertIcon />
                      </TableIconButtonContainer>
                      <Menu
                        id={`menu-${itemId}`}
                        anchorEl={anchorEl[itemId]}
                        open={open}
                        onClose={() => handleCloseDropdown(itemId)}
                        MenuListProps={{
                          "aria-labelledby": "basic-button",
                        }}
                      >
                        <MenuItem onClick={() => handleOpenModal("edit", filteredItem)}>Editar</MenuItem>
                        <MenuItem onClick={() => handleDeleteItem(itemId)}>Eliminar</MenuItem>
                      </Menu>
                    </TableCellStyledIcon>
                  </TableRow>
                );
              })}
          </TableBody>
          <StyledTableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "Todos", value: -1 }]}
                colSpan={header.length}
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
