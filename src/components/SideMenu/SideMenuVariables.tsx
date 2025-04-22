import {
  HomeOutlined as HomeIcon,
  SettingsOutlined as SettingsIcon,
  InfoOutlined as InfoIcon,
  Person3Outlined as LawyersIcon,
  CreditCardOutlined as ExpensesIcon,
  Business as CustomersIcon,
  AccessTime as AccessIcon,
  BarChart as BarChartIcon,
  Assessment as AssessmentIcon,
  Receipt as ReceiptIcon,
  AccountBalanceWalletOutlined as AccountBalanceIcon,
} from "@mui/icons-material";
import type { MenuSectionType } from "../../models/interfaces/Other/IMenu";

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
      { id: "4", route: "/clients", component: <CustomersIcon />, label: "Clientes" },
      { id: "5", route: "/lawyers", component: <LawyersIcon />, label: "Abogados" },
      {
        id: "6",
        route: "/expenses",
        component: <AccountBalanceIcon />,
        label: "Gastos",
        subItems: [
          { id: "6-1", route: "/expenses/concepts", label: "Conceptos" },
          { id: "6-2", route: "/expenses/operating", label: "Operativos" },
          { id: "6-3", route: "/expenses/fees", label: "Honorarios" },
        ],
      },
    ],
  },
  {
    id: "management",
    title: "Manejo de Información",
    items: [
      { id: "10", route: "/worklog", component: <AccessIcon />, label: "Time Manager" },
      { id: "13", route: "/billing", component: <ReceiptIcon />, label: "Facturación" },
      { id: "14", route: "/receipts", component: <ExpensesIcon />, label: "Ingresos" },
    ],
  },
  {
    id: "analysis",
    title: "Análisis y Reportes",
    items: [
      { id: "11", route: "/statistics", component: <BarChartIcon />, label: "Gráficas" },
      { id: "12", route: "/reports", component: <AssessmentIcon />, label: "Informes" },
    ],
  },
];
