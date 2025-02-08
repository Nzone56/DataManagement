import {
  HomeOutlined as HomeIcon,
  SettingsOutlined as SettingsIcon,
  InfoOutlined as InfoIcon,
  Person3Outlined as Lawyers,
  CreditCardOutlined as Expenses,
  Business as Customers,
  AccessTime as AccessIcon,
  BarChart as BarChartIcon,
  Assessment as AssessmentIcon,
} from "@mui/icons-material";
import { MenuSectionType } from "../../models/interfaces/Other/IMenu";

export const menuSections: MenuSectionType[] = [
  {
    id: "main",
    title: "Principal",
    items: [
      { id: "1", component: <HomeIcon />, label: "Inicio", route: "/home" },
      { id: "2", component: <InfoIcon />, label: "Información", route: "/information" },
      { id: "3", component: <SettingsIcon />, label: "Configuración", route: "/settings" },
    ],
  },
  {
    id: "data",
    title: "Datos Generales",
    items: [
      { id: "4", route: "/clients", component: <Customers />, label: "Clientes" },
      { id: "5", route: "/lawyers", component: <Lawyers />, label: "Abogados" },
      {
        id: "6",
        route: "/expenses",
        component: <Expenses />,
        label: "Gastos",
        subItems: [
          { id: "6-1", route: "/expenses/concepts", label: "Conceptos" },
          { id: "6-2", route: "/expenses/manage", label: "Administrar" },
        ],
      },
    ],
  },
  {
    id: "management",
    title: "Manejo de Información",
    items: [
      { id: "10", route: "/work", component: <AccessIcon />, label: "Trabajo" },
      { id: "11", route: "/statistics", component: <BarChartIcon />, label: "Gráficas" },
      { id: "12", route: "/reports", component: <AssessmentIcon />, label: "Informes" },
    ],
  },
];
