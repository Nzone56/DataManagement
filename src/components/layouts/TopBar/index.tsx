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

  const getMenuOptionByRoute = (): MenuOptionType => {
    const currentPath = location.pathname; // Ruta completa

    for (const section of menuSections) {
      const item = section.items.find((item) => {
        if (item.subItems) {
          const subItem = item.subItems.find((sub) => sub.route === currentPath);
          if (subItem) {
            return subItem;
          }
        }
        return item.route === currentPath;
      });

      if (item) {
        if (item.subItems) {
          const subItem = item.subItems.find((sub) => sub.route === currentPath);
          if (subItem) {
            return {
              id: subItem.id,
              component: item.component,
              label: `${item.label} / ${subItem.label}`,
              route: subItem.route,
            };
          }
        }
        return item;
      }
    }

    return { id: "", component: null, label: "", route: "" };
  };

  useEffect(() => {
    setCurrentMenuOption(getMenuOptionByRoute());
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
