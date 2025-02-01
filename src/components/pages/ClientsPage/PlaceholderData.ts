import {
  Client,
  ClientWorkLog,
} from "../../../models/interfaces/Client/IClient";

export const ClientList: Client[] = [
  {
    id: "1",
    name: "Juan Pérez",
    phone: "555-1234",
    joinedDate: new Date("2022-05-10"),
  },
  {
    id: "2",
    name: "Ana Gómez",
    phone: "555-5678",
    joinedDate: new Date("2023-08-15"),
  },
  {
    id: "3",
    name: "Carlos López",
    phone: "555-9101",
    joinedDate: new Date("2021-11-20"),
  },
  {
    id: "4",
    name: "Luisa Martínez",
    phone: "555-1122",
    joinedDate: new Date("2020-03-02"),
  },
  {
    id: "5",
    name: "Pedro García",
    phone: "555-3344",
    joinedDate: new Date("2024-01-10"),
  },
];

// Logs de trabajo por cliente (por ejemplo, horas trabajadas por mes y año)
export const ClientWorkLogs: ClientWorkLog[] = [
  { clientId: "1", hoursWorked: 45, month: 1, year: 2025 },
  { clientId: "1", hoursWorked: 50, month: 2, year: 2025 },
  { clientId: "2", hoursWorked: 40, month: 1, year: 2025 },
  { clientId: "3", hoursWorked: 38, month: 1, year: 2025 },
  { clientId: "4", hoursWorked: 60, month: 1, year: 2025 },
  { clientId: "5", hoursWorked: 52, month: 1, year: 2025 },
  { clientId: "5", hoursWorked: 48, month: 2, year: 2025 },
];
