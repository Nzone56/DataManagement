import { useState } from "react";
import {
  LogoMenu,
  MenuHeader,
  MenuHr,
  MenuOption,
  MenuSection,
  SideMenuContainer,
  SideMenuTitle,
  SideMenuSubTitle,
  SectionTitle,
} from "./SideMenu.styled";
import { AcUnitOutlined as AcUnitIcon } from "@mui/icons-material";
import { useSelector } from "react-redux";

import { ColumnJustifyFlex } from "../Components.styled";
import { useNavigate } from "react-router";
import { menuSections } from "./SideMenuVariables";
import { getCurrentUser } from "../../store/user/user.selector";

export const SideMenu = () => {
  const [expandedMenu, setExpandedMenu] = useState<boolean>(false);

  const user = useSelector(getCurrentUser);
  const navigate = useNavigate();

  const handleNavigateMenu = (route: string) => {
    navigate(`/${route}`);
  };

  return (
    <SideMenuContainer
      expanded={expandedMenu}
      onMouseEnter={() => setExpandedMenu(true)}
      onMouseLeave={() => setExpandedMenu(false)}
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
          {expandedMenu && <SectionTitle animate={expandedMenu}>{section.title}</SectionTitle>}
          {section.items.map((item) => (
            <MenuOption animate={expandedMenu} key={item.id} onClick={() => handleNavigateMenu(item.route)}>
              {item.component}
              {expandedMenu && <span>{item.label}</span>}
            </MenuOption>
          ))}
          <MenuHr />
        </MenuSection>
      ))}
    </SideMenuContainer>
  );
};
