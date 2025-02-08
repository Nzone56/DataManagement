export interface Lawyer {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  cc: string;
  email: string;
  joinedDate: number;
}

export interface LawyerWorkLog {
  id: string;
  lawyerId: string;
  hoursWorked: number;
  month: number; // 1-12 for months
  year: number; // Example: 2025
}
