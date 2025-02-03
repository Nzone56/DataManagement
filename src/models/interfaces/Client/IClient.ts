export interface Client {
  id: string;
  name: string;
  phone: string;
  nit: string;
  address: string;
  joinedDate: number;
}

export interface ClientWorkLog {
  id: string;
  clientId: string;
  hoursWorked: number;
  month: number; // 1-12 for months
  year: number; // Example: 2025
}
