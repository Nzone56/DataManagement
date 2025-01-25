import { useState } from "react";
import { MenuIcon, MenuOption, SideMenuContainer } from "./SideMenu.styled";

export const SideMenu = () => {
  const [expandedMenu, setExpandedMenu] = useState(false);
  return (
    <SideMenuContainer
      active={expandedMenu}
      onMouseEnter={() => setExpandedMenu(true)}
      onMouseLeave={() => setExpandedMenu(false)}
    >
      <MenuOption>
        <MenuIcon className="fas fa-home" />
      </MenuOption>
    </SideMenuContainer>
  );
};
