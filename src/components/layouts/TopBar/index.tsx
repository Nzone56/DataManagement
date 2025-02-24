import { useState } from "react";
import { SearchTopBar, TopBarContainer } from "./TopBar.styled";
import SearchIcon from "@mui/icons-material/Search";
import { CenteredBox } from "../../Components.styled";
import { Typography } from "@mui/material";
import { useSideMenu } from "../../../hooks/useSideMenu";

export const TopBar = () => {
  const [searchBox, setSearchBox] = useState<boolean>(false);
  const { currentMenuOption } = useSideMenu();

  return (
    <TopBarContainer>
      {searchBox ? (
        <input placeholder={`/ ${currentMenuOption.label}`} />
      ) : (
        <CenteredBox>
          {currentMenuOption.component}
          <Typography>/ {currentMenuOption.label}</Typography>
        </CenteredBox>
      )}
      <SearchTopBar onClick={() => setSearchBox(true)}>
        <SearchIcon />
      </SearchTopBar>
    </TopBarContainer>
  );
};
