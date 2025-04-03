import {
  Download as DownloadIcon,
  Add as AddIcon,
  Search as SearchIcon,
  Folder as FolderIcon,
  Upload as UploadIcon,
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

interface ListLayoutProps<T extends { id: string }, T2> {
  title: string;
  list: T[];
  header: string[];
  initialDataItem: T;
  loading: boolean;
  addItem: AsyncThunk<T, T, ThunkApiConfig>;
  removeItem: AsyncThunk<string, string, ThunkApiConfig>;
  updateItem: AsyncThunk<T, T, ThunkApiConfig>;
  mapUpload?: (
    data: T2[],
    concept?: "Germán Ulloa" | "Carlos Bermúdez"
  ) => {
    errorClients: string[];
    errorLawyers: string[];
    errorBills: string[];
    errorConcepts: string[];
    duplicatedData: string[];
    uniqueData: T[];
  };
  setData?: AsyncThunk<T[], T[], ThunkApiConfig>;
}

export const ListLayout = <T extends { id: string }, T2>({
  title,
  list,
  header,
  initialDataItem,
  loading,
  addItem,
  removeItem,
  updateItem,
  mapUpload,
  setData,
}: ListLayoutProps<T, T2>) => {
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

  const handleCloseModalItem = () => {
    setModalState({ open: false, mode: "create", data: undefined });
  };

  const handleCloseModalUpload = () => {
    setShowUploadModal(false);
    setAnchorEl(null);
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
          onHide={handleCloseModalItem}
          list={header}
          initialValue={modalState.data ? modalState.data : initialDataItem}
          addItem={addItem}
          updateItem={updateItem}
          loading={loading}
        />
      ) : null}
      {showUploadModal && mapUpload && setData ? (
        <ListModalUpload<T, T2>
          show={showUploadModal}
          onHide={handleCloseModalUpload}
          title={title}
          loading={loading}
          mapUpload={mapUpload}
          setData={setData}
        />
      ) : null}
      <ListTitleContainer>
        <ListTitle variant="h1">{title}</ListTitle>
      </ListTitleContainer>
      <FiltersContainer>
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
        <CenteredBox>
          <PrimaryButton variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenModal("create")}>
            Añadir {title.replace(/s$/, "")}
          </PrimaryButton>
          <TableIconButtonContainer
            aria-controls={open ? `menu` : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <IconBox ml={1}>
              <FolderIcon />
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
            <MenuItem onClick={() => setShowUploadModal(true)} disabled={title === "Abogados"}>
              <UploadIcon />
              <Typography ml={1}>Subir </Typography>
            </MenuItem>
            <MenuItem disabled>
              <DownloadIcon />
              <Typography ml={1}>Descargar </Typography>
            </MenuItem>
          </Menu>
        </CenteredBox>
      </FiltersContainer>
      <ListTable
        loading={loading}
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
