import { useLocation } from "react-router";
import { menuSections } from "../../SideMenu/SideMenuVariables";
import { useEffect, useState } from "react";
import { MenuOptionType } from "../../../models/interfaces/Other/IMenu";
import { SearchTopBar, TopBarContainer } from "./TopBar.styled";
import SearchIcon from "@mui/icons-material/Search";
import { CenteredBox } from "../../Components.styled";
import { Typography } from "@mui/material";

export const TopBar = () => {
  const location = useLocation();
  const [searchBox, setSearchBox] = useState<boolean>(false);
  const [currentMenuOption, setCurrentMenuOption] = useState<MenuOptionType>({
    id: "",
    component: null,
    label: "",
    route: "",
  });

  const getMenuTitleByRoute = () => {
    const lastSegment = location.pathname.split("/").pop();

    for (const section of menuSections) {
      const item = section.items.find((item) => item.route === lastSegment);
      if (item) {
        return item;
      }
    }
    return {
      id: "",
      component: null,
      label: "",
      route: "",
    };
  };

  useEffect(() => {
    setCurrentMenuOption(getMenuTitleByRoute());
    //eslint-disable-next-line
  }, [location.pathname]);

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
