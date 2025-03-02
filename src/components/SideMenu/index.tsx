import { Fragment, useEffect, useState } from "react";
import {
  LogoMenu,
  MenuHeader,
  MenuHr,
  MenuOption,
  MenuSection,
  SideMenuContainer,
  SideMenuTitle,
  SideMenuSubTitle,
  SideMenuPoint,
  SideMenuLine,
  MenuOptionLabel,
} from "./SideMenu.styled";
import {
  AcUnitOutlined as AcUnitIcon,
  KeyboardArrowUp as ArrowUpIcon,
  KeyboardArrowDown as ArrowDownIcon,
} from "@mui/icons-material";
import { useSelector } from "react-redux";

import { CenteredBox, CenteredBoxBetween, ColumnJustifyFlex } from "../Components.styled";
import { useLocation, useNavigate } from "react-router";
import { menuSections } from "./SideMenuVariables";
import { getCurrentUser } from "../../store/user/user.selector";
import { MenuOptionType } from "../../models/interfaces/Other/IMenu";

export const SideMenu = () => {
  const [expandedMenu, setExpandedMenu] = useState<boolean>(false);
  const [expandedMenuOption, setExpandedMenuOption] = useState<string>("");
  const user = useSelector(getCurrentUser);
  const navigate = useNavigate();

  const location = useLocation();
  const handleNavigateMenu = (item: MenuOptionType) => {
    if (!item.subItems) {
      navigate(`${item.route}`);
    } else {
      setExpandedMenuOption(expandedMenuOption === item.id ? "" : item.id);
    }
  };

  useEffect(() => {
    const isReload = sessionStorage.getItem("isReload");
    if (!isReload) {
      setExpandedMenu(true);
    }

    sessionStorage.removeItem("isReload");
  }, [location.pathname]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.setItem("isReload", "true");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  return (
    <SideMenuContainer
      expanded={expandedMenu}
      onMouseEnter={() => setExpandedMenu(true)}
      onMouseLeave={() => {
        if (expandedMenuOption !== "") setExpandedMenuOption("");
        setExpandedMenu(false);
      }}
    >
      <MenuHeader>
        <LogoMenu>
          <AcUnitIcon />
        </LogoMenu>
        {expandedMenu && (
          <ColumnJustifyFlex>
            <SideMenuTitle animate={expandedMenu}>{user?.name.concat(" ", user.lastName)}</SideMenuTitle>
            <SideMenuSubTitle animate={expandedMenu}>{user?.company}</SideMenuSubTitle>
          </ColumnJustifyFlex>
        )}
      </MenuHeader>
      {menuSections.map((section) => (
        <MenuSection key={section.id}>
          <SideMenuSubTitle animate={expandedMenu} ml={1}>
            {section.title}
          </SideMenuSubTitle>
          {section.items.map((item) => {
            return (
              <Fragment key={item.id}>
                <MenuOption animate={expandedMenu} key={item.id} onClick={() => handleNavigateMenu(item)}>
                  {!expandedMenu ? (
                    item.component
                  ) : item.subItems ? (
                    <CenteredBoxBetween>
                      <CenteredBox>
                        {item.component}
                        <MenuOptionLabel>{item.label}</MenuOptionLabel>
                      </CenteredBox>
                      {item.id === expandedMenuOption ? <ArrowUpIcon /> : <ArrowDownIcon />}
                    </CenteredBoxBetween>
                  ) : (
                    <>
                      {item.component}
                      <MenuOptionLabel>{item.label}</MenuOptionLabel>
                    </>
                  )}
                </MenuOption>
                {item.id === expandedMenuOption
                  ? item.subItems?.map((subitem) => (
                      <MenuOption animate={expandedMenu} key={subitem.id} onClick={() => handleNavigateMenu(subitem)}>
                        <ColumnJustifyFlex>
                          <SideMenuLine />
                          <SideMenuPoint active={location.pathname === subitem.route} />
                        </ColumnJustifyFlex>
                        {subitem.component}
                        <MenuOptionLabel>{subitem.label}</MenuOptionLabel>
                      </MenuOption>
                    ))
                  : null}
              </Fragment>
            );
          })}
          <MenuHr />
        </MenuSection>
      ))}
    </SideMenuContainer>
  );
};
