import { useState } from "react";
import { TopBarContainer } from "./TopBar.styled";
import { CenteredBox } from "../../Components.styled";
import { Typography } from "@mui/material";
import { useSideMenu } from "../../../hooks/useSideMenu";

export const TopBar = () => {
  const [searchBox] = useState<boolean>(false);
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
    </TopBarContainer>
  );
};
