import {
  Download as DownloadIcon,
  Add as AddIcon,
  FilterAlt as FilterIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import { CenterdBox, IconBox, PrimaryButton } from "../../Components.styled";
import {
  FiltersContainer,
  ListLayoutContainer,
  ListTitle,
  ListTitleContainer,
} from "./ListLayout.styled";
import { InputAdornment, TextField, Typography } from "@mui/material";
import { ListTable } from "./ListTable";
import { useState } from "react";
import { ListManageItemModal } from "./ListManageItemModal";

interface ListLayoutProps<
  T1 extends { id: string; name: string },
  T2 extends { id: string }
> {
  title: string;
  list: T1[];
  data: T2[];
  header: string[];
  initialDataItem: T1;
}

export const ListLayout = <
  T1 extends { id: string; name: string },
  T2 extends { id: string }
>({
  title,
  list,
  // data,
  header,
  initialDataItem,
}: ListLayoutProps<T1, T2>) => {
  const [searchState, setSearchState] = useState<string>("");
  const [modalState, setModalState] = useState<{
    open: boolean;
    mode: "create" | "edit";
    data?: T1;
  }>({
    open: false,
    mode: "create",
  });

  const handleOpenModal = (mode: "create" | "edit", data?: T1) => {
    console.log(data);
    setModalState({ open: true, mode, data });
  };

  const handleCloseModal = () => {
    setModalState({ open: false, mode: "create", data: undefined });
  };

  return (
    <ListLayoutContainer>
      {modalState.open ? (
        <ListManageItemModal
          title={title.split("s")[0]}
          show={modalState.open}
          modalType={modalState.mode}
          onHide={handleCloseModal}
          list={header}
          initialValue={modalState.data ? modalState.data : initialDataItem}
        />
      ) : null}
      <ListTitleContainer>
        <ListTitle>{title}</ListTitle>
        <CenterdBox>
          <PrimaryButton
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenModal("create")}
          >
            Añadir {title.split("s")[0]}
          </PrimaryButton>
          <IconBox ml={1}>
            <DownloadIcon />
          </IconBox>
        </CenterdBox>
      </ListTitleContainer>
      <FiltersContainer>
        <CenterdBox>
          <Typography>Last activity date</Typography>
          <Typography>Created date</Typography>
          <Typography>Advanced Filters</Typography>
          <IconBox ml={1}>
            <FilterIcon />
          </IconBox>
        </CenterdBox>
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
      />
    </ListLayoutContainer>
  );
};
