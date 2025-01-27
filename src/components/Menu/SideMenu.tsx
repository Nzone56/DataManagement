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
} from "./SideMenu.styled";
import {
  HomeOutlined as HomeIcon,
  SettingsOutlined as SettingsIcon,
  InfoOutlined as InfoIcon,
  AcUnitOutlined as AcUnitIcon,
  Person3Outlined as Lawyers,
  CreditCardOutlined as Expenses,
  Business as Customers,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import { getCurrentUser } from "../../reducer/user.selector";
import { RowJustifyFlex } from "../Components.styled";

export const SideMenu = () => {
  const [expandedMenu, setExpandedMenu] = useState<boolean>(false);

  const user = useSelector(getCurrentUser);

  const menuSections = [
    {
      id: "main",
      title: "Principal",
      items: [
        { id: 1, component: <HomeIcon />, label: "Inicio" },
        { id: 2, component: <InfoIcon />, label: "Información" },
        { id: 3, component: <SettingsIcon />, label: "Configuración" },
      ],
    },
    {
      id: "data",
      title: "Datos",
      items: [
        { id: 4, component: <Customers />, label: "Clientes" },
        { id: 5, component: <Lawyers />, label: "Abogados" },
        { id: 6, component: <Expenses />, label: "Gastos" },
      ],
    },
  ];

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
          <RowJustifyFlex>
            <SideMenuTitle animate={expandedMenu}>
              {user?.name.concat(" ", user.lastname)}
            </SideMenuTitle>
            <SideMenuSubTitle animate={expandedMenu}>
              {user?.company}
            </SideMenuSubTitle>
          </RowJustifyFlex>
        )}
      </MenuHeader>
      {menuSections.map((section) => (
        <MenuSection key={section.id}>
          {section.items.map((item) => (
            <MenuOption animate={expandedMenu} key={item.id}>
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
