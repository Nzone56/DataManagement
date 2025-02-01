import { ReactNode } from "react";

export interface MenuOptionType {
  id: string;
  component: ReactNode;
  label: string;
  route: string;
}

export interface MenuSectionType {
  id: string;
  title: string;
  items: MenuOptionType[];
}
