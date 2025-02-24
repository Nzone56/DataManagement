import { useEffect, useState } from "react";
import { MenuOptionType } from "../models/interfaces/Other/IMenu";
import { menuSections } from "../components/SideMenu/SideMenuVariables";

export const useSideMenu = () => {
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
  }, []);

  return {
    currentMenuOption,
    setCurrentMenuOption,
    getMenuOptionByRoute,
  };
};
