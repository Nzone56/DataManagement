import {
  Client,
  ClientWorkLog,
} from "../../../models/interfaces/Client/IClient";

export const ClientList: Client[] = [
  { id: "1", name: "Juan Pérez", phone: "555-1234", joinedDate: 1652145600000 }, // 2022-05-10
  { id: "2", name: "Ana Gómez", phone: "555-5678", joinedDate: 1692050400000 }, // 2023-08-15
  {
    id: "3",
    name: "Carlos López",
    phone: "555-9101",
    joinedDate: 1637366400000,
  }, // 2021-11-20
  {
    id: "4",
    name: "Luisa Martínez",
    phone: "555-1122",
    joinedDate: 1583116800000,
  }, // 2020-03-02
  {
    id: "5",
    name: "Pedro García",
    phone: "555-3344",
    joinedDate: 1704854400000,
  }, // 2024-01-10
  {
    id: "6",
    name: "María Fernández",
    phone: "555-7788",
    joinedDate: 1612137600000,
  }, // 2021-01-31
  {
    id: "7",
    name: "José Rodríguez",
    phone: "555-6677",
    joinedDate: 1596403200000,
  }, // 2020-08-03
  {
    id: "8",
    name: "Elena Sánchez",
    phone: "555-4433",
    joinedDate: 1625318400000,
  }, // 2021-07-03
  {
    id: "9",
    name: "Miguel Herrera",
    phone: "555-5566",
    joinedDate: 1662998400000,
  }, // 2022-09-13
  {
    id: "10",
    name: "Laura Díaz",
    phone: "555-9988",
    joinedDate: 1642012800000,
  }, // 2022-01-13
  {
    id: "11",
    name: "Luis Martín",
    phone: "555-2233",
    joinedDate: 1609478400000,
  }, // 2021-01-01
  {
    id: "12",
    name: "Raúl Jiménez",
    phone: "555-3345",
    joinedDate: 1631788800000,
  }, // 2021-09-17
  {
    id: "13",
    name: "Sandra Ruiz",
    phone: "555-5567",
    joinedDate: 1657353600000,
  }, // 2022-07-13
  {
    id: "14",
    name: "Jorge Moreno",
    phone: "555-7789",
    joinedDate: 1594416000000,
  }, // 2020-07-09
  {
    id: "15",
    name: "Verónica Ramírez",
    phone: "555-9911",
    joinedDate: 1604073600000,
  }, // 2020-11-01
  {
    id: "16",
    name: "Rosa Ortega",
    phone: "555-4432",
    joinedDate: 1672531200000,
  }, // 2023-01-01
  {
    id: "17",
    name: "David Álvarez",
    phone: "555-6699",
    joinedDate: 1652448000000,
  }, // 2022-05-12
  {
    id: "18",
    name: "Marta Sánchez",
    phone: "555-1123",
    joinedDate: 1644048000000,
  }, // 2022-02-06
  {
    id: "19",
    name: "Antonio López",
    phone: "555-2211",
    joinedDate: 1662988800000,
  }, // 2022-09-12
  {
    id: "20",
    name: "Natalia Gómez",
    phone: "555-3345",
    joinedDate: 1617235200000,
  }, // 2021-04-01
  {
    id: "21",
    name: "Cristina Pérez",
    phone: "555-6678",
    joinedDate: 1677552000000,
  }, // 2023-03-01
  {
    id: "22",
    name: "Francisco Rodríguez",
    phone: "555-9999",
    joinedDate: 1596816000000,
  }, // 2020-08-08
  {
    id: "23",
    name: "Inés Martín",
    phone: "555-7781",
    joinedDate: 1607798400000,
  }, // 2020-12-11
  {
    id: "24",
    name: "Carlos García",
    phone: "555-8899",
    joinedDate: 1635638400000,
  }, // 2021-10-31
  {
    id: "25",
    name: "Lucía Díaz",
    phone: "555-4455",
    joinedDate: 1681401600000,
  }, // 2023-04-13
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
