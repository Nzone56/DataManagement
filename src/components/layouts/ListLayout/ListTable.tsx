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
  TableText,
  StyledTablePagination,
  StyledChip,
} from "./ListLayout.styled";
import { TableContainer, Table, TableRow, TableBody, Menu, MenuItem } from "@mui/material";
import { codeToText, localeDictionary } from "../../../utils/locale";
import { formatDateText, formatDateInternational } from "../../../utils/dates";
import { useEffect, useState } from "react";
import { TablePaginationActions } from "./ListPaginationActions";
import { AsyncThunk } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, ThunkApiConfig } from "../../../store/store";
import { CenteredBox } from "../../Components.styled";
import { ModalPickerPrev } from "./ListModal.styled";
import { numberToCurrency } from "../../../utils/formatter";
import { TableItemChip } from "./ui/TableItemChip";
import { getSettings } from "../../../store/settings/settings.selector";
import { getComplementaryColor } from "../../../utils/getters";
import { columnWidths } from "../../pages/TimeManagerPage/WorklogVariables";
import { getLawyers } from "../../../store/lawyers/lawyers.selector";
import { getClients } from "../../../store/clients/clients.selector";

interface ListTableProps<T> {
  list: T[];
  header: string[];
  title: string;
  searchState: string;
  handleOpenModal: (mode: "edit", data: T) => void;
  removeItem: AsyncThunk<string, string, ThunkApiConfig>;
}

export const ListTable = <T extends Record<string, string | number | string[] | boolean>>({
  list,
  header,
  title,
  searchState,
  handleOpenModal,
  removeItem,
}: ListTableProps<T>) => {
  const dispatch = useDispatch<AppDispatch>();
  const { dateFormat } = useSelector(getSettings);
  const { lawyers } = useSelector(getLawyers);
  const { clients } = useSelector(getClients);

  // PAGINATION AND TABLE STATES
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filteredValues, setFilteredValues] = useState<T[]>([]);
  const [sortedHeader, setSortedHeader] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
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
                      cellminwidth={title === "TimeManager" ? String(columnWidths[rowHeader]) : ""}
                      header={true}
                      key={rowHeader}
                      onClick={() => handleSortHeader(rowHeader)}
                      sx={{ cursor: "pointer", maxHeight: "50px" }}
                      size="small"
                    >
                      <CenteredBox>
                        <TableText>{codeToText(rowHeader as keyof typeof localeDictionary)}</TableText>
                        {sortedHeader === rowHeader ? (
                          sortOrder === "asc" ? (
                            <ArrowUpIcon sx={{ marginLeft: "8px", marginBottom: "2px" }} />
                          ) : (
                            <ArrowDownIcon sx={{ marginLeft: "8px" }} />
                          )
                        ) : null}
                      </CenteredBox>
                    </TableCellStyled>
                  );
                }
                return (
                  <TableCellStyled
                    cellminwidth={title === "TimeManager" ? String(columnWidths[rowHeader]) : ""}
                    size="small"
                    cellwidth={((100 - 5) / header.length).toString()}
                    header={true}
                  >
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
            {filteredValues
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
              .slice(
                rowsPerPage === -1 ? 0 : page * rowsPerPage,
                rowsPerPage === -1 ? undefined : page * rowsPerPage + rowsPerPage
              )
              .map((filteredItem) => {
                const itemId = String(filteredItem.id);
                const open = Boolean(anchorEl[itemId]);
                return (
                  <TableRow key={itemId}>
                    {header.map((headerItem, index) => (
                      <TableCellStyled key={index} cellwidth="" cellminwidth="" header={false} size="small">
                        {headerItem.toLocaleLowerCase().includes("date") ? (
                          <TableText>
                            {dateFormat === "international"
                              ? formatDateInternational(Number(filteredItem[headerItem]))
                              : formatDateText(Number(filteredItem[headerItem]))}
                          </TableText>
                        ) : headerItem.toLocaleLowerCase().includes("color") ? (
                          <CenteredBox>
                            <ModalPickerPrev color={String(filteredItem[headerItem])} />
                            <TableText ml={1}>{filteredItem[headerItem]}</TableText>
                          </CenteredBox>
                        ) : headerItem.toLocaleLowerCase().includes("amount") ? (
                          <TableText ml={1}>{numberToCurrency(Number(filteredItem[headerItem]))}</TableText>
                        ) : headerItem === "conceptId" ? (
                          <TableItemChip id={String(filteredItem[headerItem])} title={headerItem} />
                        ) : headerItem === "lawyerId" ? (
                          <TableText>
                            {lawyers.find((lawyer) => lawyer.id === filteredItem[headerItem])?.name || "No encontrado"}
                          </TableText>
                        ) : headerItem === "clientId" ? (
                          <TableText>
                            {clients.find((client) => client.id === filteredItem[headerItem])?.name || "No encontrado"}
                          </TableText>
                        ) : headerItem.toLocaleLowerCase().includes("sub") ? (
                          Array.isArray(filteredItem[headerItem]) &&
                          filteredItem[headerItem].map((item) => (
                            <StyledChip
                              label={item}
                              chipcolor={String(filteredItem.color)}
                              chiptextcolor={getComplementaryColor(String(filteredItem.color))}
                              sx={{ margin: "2px 4px" }}
                            />
                          ))
                        ) : (
                          <TableText>
                            {filteredItem[headerItem] === true
                              ? "Si"
                              : filteredItem[headerItem] === false
                              ? "No"
                              : `${filteredItem[headerItem] || "--"}`}
                          </TableText>
                        )}
                      </TableCellStyled>
                    ))}
                    <TableCellStyledIcon header={false}>
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
              <StyledTablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "Todos", value: -1 }]}
                colSpan={title === "TimeManager" ? 5 : header.length}
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
