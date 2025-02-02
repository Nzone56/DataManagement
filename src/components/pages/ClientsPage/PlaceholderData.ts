import {
  Client,
  ClientWorkLog,
} from "../../../models/interfaces/Client/IClient";

export const InitialClient: Client = {
  id: "",
  name: "",
  phone: "",
  nit: "",
  address: "",
  joinedDate: Date.now(),
};

export const ClientList: Client[] = [
  {
    id: "1",
    name: "Tech Solutions S.A.S.",
    phone: "+57 310 1234567",
    nit: "900123456-7",
    address: "Cra 10 #15-30, Bogotá",
    joinedDate: 1652145600000,
  }, // 2022-05-10
  {
    id: "2",
    name: "Innovatech Ltda.",
    phone: "+57 320 2345678",
    nit: "901234567-8",
    address: "Calle 45 #20-50, Bogotá",
    joinedDate: 1692050400000,
  }, // 2023-08-15
  {
    id: "3",
    name: "DigitalWeb S.A.",
    phone: "+57 300 3456789",
    nit: "902345678-9",
    address: "Av. Caracas #30-40, Bogotá",
    joinedDate: 1637366400000,
  }, // 2021-11-20
  {
    id: "4",
    name: "DataCorp S.A.S.",
    phone: "+57 311 4567890",
    nit: "903456789-0",
    address: "Cra 50 #10-20, Bogotá",
    joinedDate: 1583116800000,
  }, // 2020-03-02
  {
    id: "5",
    name: "SoftDev Ltda.",
    phone: "+57 312 5678901",
    nit: "904567890-1",
    address: "Calle 80 #25-35, Bogotá",
    joinedDate: 1704854400000,
  }, // 2024-01-10
  {
    id: "6",
    name: "CloudTech S.A.S.",
    phone: "+57 313 6789012",
    nit: "905678901-2",
    address: "Av. Suba #100-50, Bogotá",
    joinedDate: 1612137600000,
  }, // 2021-01-31
  {
    id: "7",
    name: "AI Solutions S.A.",
    phone: "+57 314 7890123",
    nit: "906789012-3",
    address: "Calle 170 #15-60, Bogotá",
    joinedDate: 1596403200000,
  }, // 2020-08-03
  {
    id: "8",
    name: "RedNet Ltda.",
    phone: "+57 315 8901234",
    nit: "907890123-4",
    address: "Cra 7 #45-55, Bogotá",
    joinedDate: 1625318400000,
  }, // 2021-07-03
  {
    id: "9",
    name: "CyberTech S.A.S.",
    phone: "+57 316 9012345",
    nit: "908901234-5",
    address: "Av. Boyacá #90-40, Bogotá",
    joinedDate: 1662998400000,
  }, // 2022-09-13
  {
    id: "10",
    name: "Ecommerce Pro Ltda.",
    phone: "+57 317 0123456",
    nit: "909012345-6",
    address: "Calle 26 #30-20, Bogotá",
    joinedDate: 1642012800000,
  }, // 2022-01-13
];

// Logs de trabajo por cliente (por ejemplo, horas trabajadas por mes y año)
export const ClientWorkLogs: ClientWorkLog[] = [
  { id: "1", clientId: "1", hoursWorked: 45, month: 1, year: 2025 },
  { id: "2", clientId: "1", hoursWorked: 50, month: 2, year: 2025 },
  { id: "3", clientId: "2", hoursWorked: 40, month: 1, year: 2025 },
  { id: "4", clientId: "3", hoursWorked: 38, month: 1, year: 2025 },
  { id: "5", clientId: "4", hoursWorked: 60, month: 1, year: 2025 },
  { id: "6", clientId: "5", hoursWorked: 52, month: 1, year: 2025 },
  { id: "7", clientId: "5", hoursWorked: 48, month: 2, year: 2025 },
];
