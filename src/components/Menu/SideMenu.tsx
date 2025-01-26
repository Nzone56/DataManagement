import { useState } from "react";
import {
  LogoMenu,
  MenuHeader,
  MenuHr,
  MenuOption,
  MenuSection,
  SideMenuContainer,
} from "./SideMenu.styled";
import {
  HomeOutlined as HomeIcon,
  SettingsOutlined as SettingsIcon,
  InfoOutlined as InfoIcon,
  AcUnitOutlined as AcUnitIcon,
} from "@mui/icons-material";

export const SideMenu = () => {
  const [expandedMenu, setExpandedMenu] = useState(true);

  const icons = [
    { id: 1, component: <HomeIcon />, label: "Home" },
    { id: 2, component: <SettingsIcon />, label: "Settings" },
    { id: 3, component: <InfoIcon />, label: "Info" },
  ];

  return (
    <SideMenuContainer
      active={expandedMenu}
      onMouseEnter={() => setExpandedMenu(false)}
      onMouseLeave={() => setExpandedMenu(true)}
    >
      <MenuHeader>
        <LogoMenu>
          <AcUnitIcon />
        </LogoMenu>
      </MenuHeader>
      <MenuSection>
        {icons.map((icon) => (
          <MenuOption key={icon.id}>
            {icon.component}
            {expandedMenu && <span>{icon.label}</span>}
          </MenuOption>
        ))}
      </MenuSection>
      <MenuHr />
    </SideMenuContainer>
  );
};
