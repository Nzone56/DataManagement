export interface Client {
  id: string;
  name: string;
  phone: string;
  joinedDate: Date;
}

export interface ClientWorkLog {
  clientId: string;
  hoursWorked: number;
  month: number; // 1-12 for months
  year: number; // Example: 2025
}
