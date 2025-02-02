import {
  Download as DownloadIcon,
  Add as AddIcon,
  FilterAlt as FilterIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import { CenterdBox, IconBox } from "../../Components.styled";
import {
  AddButton,
  FiltersContainer,
  ListLayoutContainer,
  ListTitle,
  ListTitleContainer,
} from "./ListLayout.styled";
import { InputAdornment, TextField, Typography } from "@mui/material";
import { ListTable } from "./ListTable";
import { useState } from "react";

interface ListLayoutProps<T extends { id: number }> {
  title: string;
  list: T[];
  data: T[];
  header: string[];
}

export const ListLayout = <T extends { id: number }>({
  title,
  list,
  // data,
  header,
}: ListLayoutProps<T>) => {
  const [searchState, setSearchState] = useState<string>("");
  return (
    <ListLayoutContainer>
      <ListTitleContainer>
        <ListTitle>{title}</ListTitle>
        <CenterdBox>
          <AddButton variant="contained" startIcon={<AddIcon />}>
            Añadir {title.split("s")[0]}
          </AddButton>
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
      />
    </ListLayoutContainer>
  );
};
