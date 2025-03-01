import {
  Download as DownloadIcon,
  Add as AddIcon,
  FilterAlt as FilterIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import { CenteredBox, IconBox, PrimaryButton } from "../../Components.styled";
import {
  FiltersContainer,
  ListLayoutContainer,
  ListTitle,
  ListTitleContainer,
  TableIconButtonContainer,
} from "./ListLayout.styled";
import { InputAdornment, Menu, MenuItem, TextField, Typography } from "@mui/material";
import { ListTable } from "./ListTable";
import { useState } from "react";
import { ListManageItemModal } from "./ListManageItemModal";
import { AsyncThunk } from "@reduxjs/toolkit";
import { ThunkApiConfig } from "../../../store/store";
import { ListModalUpload } from "./ListModalUpload";

interface ListLayoutProps<T extends { id: string }> {
  title: string;
  list: T[];
  header: string[];
  initialDataItem: T;
  loading: boolean;
  addItem: AsyncThunk<T, T, ThunkApiConfig>;
  removeItem: AsyncThunk<string, string, ThunkApiConfig>;
  updateItem: AsyncThunk<T, T, ThunkApiConfig>;
}

export const ListLayout = <T extends { id: string }>({
  title,
  list,
  header,
  initialDataItem,
  // loading,
  addItem,
  removeItem,
  updateItem,
}: ListLayoutProps<T>) => {
  const [searchState, setSearchState] = useState<string>("");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [modalState, setModalState] = useState<{
    open: boolean;
    mode: "create" | "edit";
    data?: T;
  }>({
    open: false,
    mode: "create",
  });
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpenModal = (mode: "create" | "edit", data?: T) => {
    setModalState({ open: true, mode, data });
  };

  const handleCloseModal = () => {
    setModalState({ open: false, mode: "create", data: undefined });
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <ListLayoutContainer>
      {modalState.open ? (
        <ListManageItemModal
          title={title.replace(/s$/, "")}
          show={modalState.open}
          modalType={modalState.mode}
          onHide={handleCloseModal}
          list={header}
          initialValue={modalState.data ? modalState.data : initialDataItem}
          addItem={addItem}
          updateItem={updateItem}
        />
      ) : null}
      {showUploadModal ? (
        <ListModalUpload show={showUploadModal} onHide={() => setShowUploadModal(false)} title={title} />
      ) : null}
      <ListTitleContainer>
        <ListTitle variant="h1">{title}</ListTitle>
        <CenteredBox>
          <PrimaryButton variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenModal("create")}>
            Añadir {title.replace(/s$/, "")}
          </PrimaryButton>
          <TableIconButtonContainer
            aria-controls={open ? `menu}` : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <IconBox ml={1}>
              <DownloadIcon />
            </IconBox>
          </TableIconButtonContainer>
          <Menu
            id={`menu`}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={() => setShowUploadModal(true)}>Subir</MenuItem>
            <MenuItem disabled>Descargar</MenuItem>
          </Menu>
        </CenteredBox>
      </ListTitleContainer>
      <FiltersContainer>
        <CenteredBox>
          <Typography>Last activity date</Typography>
          <Typography>Created date</Typography>
          <Typography>Advanced Filters</Typography>
          <IconBox ml={1}>
            <FilterIcon />
          </IconBox>
        </CenteredBox>
        <TextField
          variant="outlined"
          placeholder="Buscar..."
          size="small"
          onChange={(e) => setSearchState(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </FiltersContainer>
      <ListTable
        list={list}
        header={header}
        title={title}
        searchState={searchState}
        handleOpenModal={handleOpenModal}
        removeItem={removeItem}
      />
    </ListLayoutContainer>
  );
};
